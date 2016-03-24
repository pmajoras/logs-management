var Q = require('q');
var BaseService = require('../BaseService');
var client = require('../JqueryRestClientService').authentication;
var appErrors = require('../../errors/app-errors');
var storageService = require('../storage/StorageService');
var moment = require('moment');

class AuthenticationService extends BaseService {
  constructor() {
    super();
  }

  authenticate(userViewModel) {
    if (!userViewModel || !userViewModel.username || !userViewModel.password) {
      return Q.reject(appErrors("O nome de usuário e a senha são obrigatórios."));
    }

    let deferred = Q.defer();

    this.handleApiPromise(client.authenticate.post(userViewModel))
      .then((data) => {

        storageService.setItem("AUTH_TOKEN", data.token);
        storageService.setItem("AUTH_EXPIRES", data.expiresAt);
        deferred.resolve(data);
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  getAuthToken() {

    return this.isAuthenticated() ? storageService.getItem("AUTH_TOKEN") : null;
  }

  isAuthenticated() {
    let expiresAtString = storageService.getItem("AUTH_EXPIRES");
    if (expiresAtString) {
      let expiresAt = moment(expiresAtString);
      if (expiresAt.diff(moment()) >= 0) {
        return true;
      }
    }

    return false;
  }
}

module.exports = AuthenticationService;