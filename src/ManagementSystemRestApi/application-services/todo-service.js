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

  createBoard(userId, boardName, boardDescription) {
    let deferred = Q.defer();
    let userMustExistWithIdSpec = new UserMustExistWithIdSpec(this._userService);
    let foundUser = null;
    let createdBoard = null;

    let saveBoard = (user) => {
      foundUser = user;
      return this._boardService.save({ name: boardName, description: boardDescription, owner: foundUser._id });
    };

    let updateUser = (newBoard) => {
      createdBoard = newBoard;
      foundUser.boards.push(createdBoard._id);
      return this._userService.save(foundUser);
    };

    userMustExistWithIdSpec.isSatisfiedBy(userId)
      .then(saveBoard)
      .then(updateUser)
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