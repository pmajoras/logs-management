"use strict";
var UserService = require('../domain/services/users/user-service');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var appConstants = require('../config/app-constants');
var UserMustExistSpec = require('./specifications/authentication-service-specs/user-must-exist-spec');
var Q = require('q');
var moment = require('moment');

class AuthenticationService {
  constructor() {
    this.userService = new UserService();
  }

  _createToken(username, id) {
    return jwt.sign({ username: username, _id: id, permissions: [appConstants.mustBeAuthenticatedPermission] }, config.secret, {
      expiresIn: "1h" // expires in 1 hour
    });
  }

  registerAndAuthenticate(userViewModel) {
    let deferred = Q.defer();
    this.userService.save(userViewModel)
      .then((newEntity) => {
        // create a token
        let token = this._createToken(newEntity.username, newEntity._id);
        deferred.resolve({ token: token, id: newEntity._id, expiresAt: moment().add(1, "hour").format() });
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  /** 
   * 
  */
  authenticate(authenticateViewModel) {
    let deferred = Q.defer();

    let userMustExistSpec = new UserMustExistSpec(this.userService);

    userMustExistSpec.isSatisfiedBy(authenticateViewModel)
      .then((user) => {
        // create a token
        let token = this._createToken(user.username, user._id);
        deferred.resolve({ token: token, id: user._id, expiresAt: moment().add(1, "hour").format() });
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }
}

module.exports = AuthenticationService;