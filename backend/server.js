const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {APP_PORT, DB_URL} = require('./config');
const routes = require('./routes');
const cors = require("cors");
const errorHandler = require('./middlewares/errorHandler')

mongoose.connect(DB_URL, {
serverSelectionTimeoutMS: 30000
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(APP_PORT,()=>{
  console.log(`app running on the ${APP_PORT}`);
});
