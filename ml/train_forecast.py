import os #pour lire les variables d'environnement
import pandas as pd #pour manipuler les données (resultat sql)
import psycopg2 # pour se connecter à PostgreSQL et exécuter des requêtes
from dotenv import load_dotenv # pour charger mon fichier . env   
from prophet import Prophet#c'est le modele pour predire 

load_dotenv(os.path.join(os.path.dirname(__file__), '..', 'sales-dashboard-backend', '.env'))

DATABASE_URL = os.environ['DATABASE_URL']
HORIZON_DAYS = 90
ALERT_LOOKBACK_DAYS = 30

def get_categories_and_regions(conn):
    categories = pd.read_sql_query("SELECT DISTINCT category FROM sales", conn)['category'].tolist()
    regions = pd.read_sql_query("SELECT DISTINCT region FROM sales", conn)['region'].tolist()
    return categories, regions


def load_daily_sales(conn, category, region):
    query = """
        SELECT sale_date AS ds, SUM(amount) AS y
        FROM sales
        WHERE category = %(category)s AND region = %(region)s
        GROUP BY sale_date
        ORDER BY sale_date
    """
    df = pd.read_sql_query(query, conn, params={'category': category, 'region': region})
    df['ds'] = pd.to_datetime(df['ds'])
    return df
def forecast_one_series(df):
    model = Prophet()
    model.fit(df)
    future = model.make_future_dataframe(periods=HORIZON_DAYS)
    forecast = model.predict(future)
    return forecast

def classify_severity(deviation_percent):
    abs_dev = abs(deviation_percent)
    if abs_dev >= 50:
        return 'high'
    if abs_dev >= 25:
        return 'medium'
    if abs_dev >= 10:
        return 'low'
    return None


def detect_alerts(df, forecast):
    lookback_start = df['ds'].max() - pd.Timedelta(days=ALERT_LOOKBACK_DAYS)
    recent_actual = df[df['ds'] > lookback_start]
    merged = recent_actual.merge(forecast[['ds', 'yhat']], on='ds', how='inner')
    merged['deviation_percent'] = (merged['y'] - merged['yhat']) / merged['yhat'] * 100
    return merged

def main():
    conn = psycopg2.connect(DATABASE_URL)
    categories, regions = get_categories_and_regions(conn)

    cur = conn.cursor()
    cur.execute("DELETE FROM sales_forecasts")

    insert_query = """
        INSERT INTO sales_forecasts
            (forecast_date, product, region, predicted_amount, lower_bound, upper_bound, model_name)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    cur.execute("DELETE FROM sales_alerts")

    alert_insert_query = """
    INSERT INTO sales_alerts
        (alert_date, product, region, actual_amount, predicted_amount, deviation_percent, severity)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    for category in categories:
        for region in regions:
            df = load_daily_sales(conn, category, region)
            if len(df) < 2:
                print(f"Ignoré (pas assez de données) : {category} / {region}")
                continue

            forecast = forecast_one_series(df)
            future_forecast = forecast[forecast['ds'] > df['ds'].max()]

            for _, row in future_forecast.iterrows():
                cur.execute(insert_query, (
                    row['ds'].date(),
                    category,
                    region,
                    max(0, round(row['yhat'], 2)),
                    max(0, round(row['yhat_lower'], 2)),
                    round(row['yhat_upper'], 2),
                    'prophet',
                ))
            alerts = detect_alerts(df, forecast)
            alert_count = 0
            for _, row in alerts.iterrows():
                severity = classify_severity(row['deviation_percent'])
                if severity is None:
                    continue
                cur.execute(alert_insert_query, (
                    row['ds'].date(),
                    category,
                    region,
                    round(row['y'], 2),
                    round(row['yhat'], 2),
                    round(row['deviation_percent'], 2),
                    severity,
                ))
                alert_count += 1
            print(f"OK : {category} / {region} -> {len(future_forecast)} jours prévus, {alert_count} alertes")
    

    conn.commit()
    cur.close()
    conn.close()


if __name__ == '__main__':
    main()
