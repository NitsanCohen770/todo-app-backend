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

const app = express();
const store = new MongoDBStore({
  uri:
    'mongodb+srv://ColdEye:ua3ddcs3@cluster0.wlzpx.mongodb.net/myTodoAppDatabase?retryWrites=true&w=majority',
  collection: 'sessions',
  connectionOptions: {
    sslCA: ca,
  },
});
app.use(bodyParser.json());
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
const userRoutes = require('./routes/user');

const authRoutes = require('./routes/auth');

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   // res.locals.csrfToken = req.csrfToken();
//   next();
// });
// app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(authRoutes);

// app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://ColdEye:ua3ddcs3@cluster0.wlzpx.mongodb.net/myTodoAppDatabase?retryWrites=true&w=majority',
    {
      sslValidate: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      sslValidate: false,
      sslCA: ca,
    } // פה מצרפים את התעודה בזמן החיבור
  )
  .then(result => app.listen(3003));
