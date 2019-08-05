const express = require('express');
const router = express.Router();
const userController = require('../app/api/v1/controller/usercontroller');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration


// user management
router.post('/create', userController.createaccount);
router.post('/login', userController.authenticate);
router.post('/company-create', userController.createcompany);

function hasToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403).send(err);
        }
        req.body.userId = decoded.id;
        return next();
      });
    } else {
      res.status(403).send({
        message: 'You have to be loggedin first'
      });
    }
  }

    
  
  
module.exports = router;