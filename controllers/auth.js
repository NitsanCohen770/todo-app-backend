const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const expressValidator = require('express-validator');
// const { copy } = require('../routes/admin');
const transportoer = nodemailer.createTransport(
  sendGridTransport({
    secure: false,
    auth: {
      api_key:
        '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',
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
);
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return;
      }

      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            let token = jwt.sign(
              { userId: user.id, email: email },
              'supersecertshhhhhh',
              {
                expiresIn: '1h',
              }
            );
            console.log(token);
            return res
              .status(201)
              .json({ userId: user.id, token: token, email: email });
          }
        })
        .catch(err => {
          return res.status(422);
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email }).then(userDoc => {
    if (userDoc) {
      console.log('falied');
      return new Error('failed');
    }
    return bcrypt.hash(password, 12).then(hashedPassword => {
      console.log('success');
      const user = new User({
        email,
        password: hashedPassword,
        // cart: { items: [] },
      });
      return user.save().then(resopnde => {
        let token = jwt.sign(
          { userId: user.id, email: email },
          'supersecertshhhhhh',
          {
            expiresIn: '1h',
          }
        );
        return res
          .status(201)
          .json({ userId: user.id, token: token, email: email });
      });
    });
  });
};
//     .then(result => {
//       return transportoer
//         .sendMail({
//           to: email,
//           from: 'nitsancohen770@gmail.com',
//           subject: 'SignUp succeeded',
//           html: '<h1>You successfully sign up </h1>',
//         })
//         .catch(err => {
//           console.log(err);
//           console.log('errorhere');
//         });
//     })
//     .catch(err => console.log(err));
// };
