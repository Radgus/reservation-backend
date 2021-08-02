const express = require('express');
const app = express();

const { config } = require('./config/index');

const autApi = require('./routes/auth');

// body parser
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'),
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method'),
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'),
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE'),
  next();
}) 

// routes
autApi(app);

app.listen(config.port || 4000, function(){
  console.log(`Listening http://localhost:${config.port}`)
});