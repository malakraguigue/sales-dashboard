require('dotenv').config();
const express = require('express');
const cors = require('cors');
const salesRoutes = require('./routes/sales.routes');
const kpisRoutes = require('./routes/kpis.routes');
const forecastsRoutes=require('./routes/forecasts.routes')
const alertsRoutes=require('./routes/alerts.routes')
const authRoutes=require('./routes/auth.routes')
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')
const { spawn } = require('child_process')
const path = require('path')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cors());
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/', (req, res) => {
  res.send('API Sales Dashboard opérationnelle');
});
app.use('/api/auth',authRoutes)
app.use('/api/sales', salesRoutes);
app.use('/api/kpis', kpisRoutes);
app.use('/api/forecasts',forecastsRoutes);
app.use('/api/alerts',alertsRoutes);
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);

  const pythonPath = path.join(__dirname, '..', 'venv', 'bin', 'python3');
  const scriptPath = path.join(__dirname, '..', 'ml', 'train_forecast.py');
  const forecastProcess = spawn(pythonPath, [scriptPath]);

  forecastProcess.stdout.on('data', (data) => console.log(`[forecast] ${data}`));
  forecastProcess.stderr.on('data', (data) => console.error(`[forecast] ${data}`));
  forecastProcess.on('close', (code) => console.log(`[forecast] terminé, code ${code}`));
});
