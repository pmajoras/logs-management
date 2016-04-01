"use strict";
import React from "react";
import AppForm from "../../../components/common/AppForm.jsx";
import AppText from "../../../components/common/AppText.jsx";
import TodoStore from "../../../stores/todo/TodoStore";
import TodoActions from "../../../actions/todo/TodoActions";

const store = TodoStore;
const storeEvents = TodoStore.events;

export default class CreateBoard extends React.Component {

  constructor(props) {
    super(props);
    this.handleBoardSubmission = this.handleBoardSubmission.bind(this);

    this.validation = {
      boardName: {
        errors: {
          isRequired: "O campo é obrigatório",
        },
        rules: {
          isRequired: true
        }
      }
    };
  }

  componentWillMount() {
    store.on(storeEvents.boardCreated, this.handleBoardSubmission);
  }

  componentWillUnmount() {
    store.removeListener(storeEvents.boardCreated, this.handleBoardSubmission);
  }

  componentDidMount() {
    this.refs.boardName.focus();
  }

  handleBoardSubmission(err, data) {
    this.refs.createBoardForm.handleFormSubmission(err);
    if (!err) {
      if (typeof this.props.onSuccess === 'function') {
        this.props.onSuccess(data);
      }
    }
  }

  createBoard(model) {
    TodoActions.createBoard(model);
  }

  render() {
    const {boardName} = this.validation;

    return (
      <AppForm ref="createBoardForm" onFormSubmit={this.createBoard.bind(this) }>
        <div class="form-group">
          <AppText
            hintText="Nome"
            ref="boardName"
            id="boardName"
            type="text"
            name="name"
            floatingLabelText="Nome(*)"
            validationErrors={boardName.errors}
            validations={boardName.rules}/>
        </div>
        <div class="form-group">
          <AppText
            hintText="Descrição"
            id="boardDescription"
            type="text"
            name="description"
            floatingLabelText="Descrição"/>
        </div>
      </AppForm>
    );
  }
}
