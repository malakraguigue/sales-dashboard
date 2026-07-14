require('dotenv').config();
const express = require('express');
const cors = require('cors');
const salesRoutes = require('./routes/sales.routes');
const kpisRoutes = require('./routes/kpis.routes');
const forecastsRoutes=require('./routes/forecasts.routes')
const alertsRoutes=require('./routes/alerts.routes')
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/', (req, res) => {
  res.send('API Sales Dashboard opérationnelle');
});

app.use('/api/sales', salesRoutes);
app.use('/api/kpis', kpisRoutes);
app.use('/api/forecasts',forecastsRoutes);
app.use('/api/alerts',alertsRoutes);
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
