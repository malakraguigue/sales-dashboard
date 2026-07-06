-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "sale_date" DATE NOT NULL,
    "product" VARCHAR(255) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "region" VARCHAR(100) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "stock_quantity" INTEGER,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_alerts" (
    "id" SERIAL NOT NULL,
    "alert_date" DATE NOT NULL,
    "product" VARCHAR(100),
    "region" VARCHAR(100),
    "actual_amount" DECIMAL(12,2),
    "predicted_amount" DECIMAL(12,2),
    "deviation_percent" DECIMAL(6,2),
    "severity" VARCHAR(20),

    CONSTRAINT "sales_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_forecasts" (
    "id" SERIAL NOT NULL,
    "forecast_date" DATE NOT NULL,
    "product" VARCHAR(100),
    "region" VARCHAR(100),
    "predicted_amount" DECIMAL(12,2) NOT NULL,
    "lower_bound" DECIMAL(12,2),
    "upper_bound" DECIMAL(12,2),
    "model_name" VARCHAR(100),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_forecasts_pkey" PRIMARY KEY ("id")
);

