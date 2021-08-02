const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

const UsersService = require('../services/users');

// Basic strategy
require('../utils/auth/strategies/basic');


function authApi(app) {
  const router = express.Router();
  app.use('/v1/api/auth', router);

  router.post('/sign-in', async function(req, res, next) {
    passport.authenticate('basic', function(error, user) {
      
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        req.login(user, {session: false}, async function(error) {
          if(error) {
            next(error)
          }

          const { _id: id, name, email} = user;

          const payload = {
            sub: id,
            name, 
            email, 
          }

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '5m'
          });

          return res.status(200).json({ token, user: {id, name, email }})

        })
      } catch (error) {
        next(error);
      }
    })(req, res, next);

  })
}

module.exports = authApi;
