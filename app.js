const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { client_router, user_router } = require('./routes/index');

const app = express();
const PORT = process.env.port || 3000;

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

mongoose.connect('mongodb://localhost:27017/marketplace', (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
      });
    }
});

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*'); 
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.use('/api', client_router);
app.use('/api', user_router);

module.exports = app;
