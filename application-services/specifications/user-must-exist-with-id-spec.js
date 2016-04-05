"use strict";

var ApplicationServiceSpec = require('./application-service-spec');
var Q = require('q');

class UserMustExistWithIdSpec extends ApplicationServiceSpec {
  constructor(userService) {
    super((userId) => {

      if (userId && userService) {
        let deferred = Q.defer();

        userService.findById(userId)
          .then((user) => {
            if (user) {
              deferred.resolve(user);
            }
            else {
              deferred.reject(this.getSpecificationError());
            }
          }, (err) => {
            deferred.reject(err);
          });

        return deferred.promise;
      }
      else {
        return Q.reject(this.getSpecificationError());
      }
    });

    this.notSatisfiedReason = "O usuário com o id informado não foi encontrado.";
    this.errorCode = 200;
  }
}

module.exports = UserMustExistWithIdSpec;