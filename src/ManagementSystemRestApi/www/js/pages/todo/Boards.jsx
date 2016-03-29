"use strict";
import React from "react";
import SearchContainer from "../../components/common/SearchContainer.jsx";
import TodoActions from "../../actions/todo/TodoActions";

export default class Boards extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    TodoActions.getBoards();
  }

  search(value) {
    console.log("search", value);
  }

  render() {
    return (
      <SearchContainer onSearch={this.search.bind(this) }/>
    );
  }
}
