"use strict";
var UserService = require('../domain/services/users/user-service');
var BoardService = require('../domain/services/boards/board-service');
var UserMustExistWithIdSpec = require('./specifications/user-must-exist-with-id-spec');
var Q = require("q");

class TodoService {
  constructor(userService, boardService) {
    this._userService = userService || new UserService();
    this._boardService = boardService || new BoardService();
  }

  /**
  * @param {Object} id - The user id.
  * @returns {Promise}
  */
  getBoardsByUserId(id) {
    let deferred = Q.defer();

    this._userService.findById(id, "boards", true)
      .then((user) => {
        let boards = user.boards || [];
        deferred.resolve(boards);
      }, (err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  createBoard(boardViewModel) {
    let deferred = Q.defer();
    let foundUser = null;
    let createdBoard = null;

    let userWithIdMustExist = () => {
      let userMustExistDeferred = Q.defer();
      let userMustExistWithIdSpec = new UserMustExistWithIdSpec(this._userService);

      userMustExistWithIdSpec.isSatisfiedBy(boardViewModel.userId)
        .then((user) => {
          foundUser = user;
          userMustExistDeferred.resolve(user);
        }, (err) => {
          userMustExistDeferred.reject(err);
        });

      return userMustExistDeferred.promise;
    };

    let saveBoard = () => {
      let saveBoardDeferred = Q.defer();
      this._boardService.save({ name: boardViewModel.name, description: boardViewModel.description, owner: foundUser._id })
        .then((newBoard) => {
          createdBoard = newBoard;
          saveBoardDeferred.resolve(newBoard);
        }, (err) => {
          saveBoardDeferred.reject(err);
        });

      return saveBoardDeferred.promise;
    };

    let updateUserBoards = () => {
      let saveUserDeferred = Q.defer();
      foundUser.boards.push(createdBoard._id);

      this._userService.save(foundUser)
        .then(() => {
          saveUserDeferred.resolve(foundUser);
        }, (err) => {
          saveUserDeferred.reject(err);
        });

      return saveUserDeferred.promise;
    };

    Q.fcall(userWithIdMustExist)
      .then(saveBoard)
      .then(updateUserBoards)
      .then(() => {
        deferred.resolve(createdBoard);
      })
      .catch((err) => {
        deferred.reject(err);
      });

    return deferred.promise;
  }
}

module.exports = TodoService;