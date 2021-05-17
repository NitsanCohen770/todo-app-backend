const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const errorController = require('./controllers/error');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const fs = require('fs');
const ca = [fs.readFileSync(__dirname + '/cert.pem')];
const User = require('./models/user');
const mongoose = require('mongoose');
const csrf = require('csurf');
const cors = require('cors');
const dotenv = require('dotenv');
const checkDevelopment = process.env.NODE_ENV === 'development';
console.log(checkDevelopment);
dotenv.config();
const uri = process.env.MONGO_CONNECT;
console.log(process.env.MONGO_USER);
const mongodbURL = uri;
const app = express();
const store = new MongoDBStore({
  uri: mongodbURL,
  collection: 'sessions',
  connectionOptions: {
    sslCA: ca,
  },
});
app.use(bodyParser.json());
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
const userRoutes = require('./routes/user');

const authRoutes = require('./routes/auth');

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(userRoutes);
app.use(authRoutes);

mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    sslCA: ca,
  })
  .then(result => app.listen(process.env.PORT || 3003));
