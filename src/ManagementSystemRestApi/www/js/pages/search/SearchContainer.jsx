"use strict";
import React from "react";

export default class SearchContainer extends React.Component {
  render() {
    return (
      <div class="panel panel-default">
        <div class="panel-body">
          <button class="button button-raised button-action button-circle pull-left">
            <i class="fa fa-search fa-1x"></i>
          </button>
          <div class="search-text-container">
            <input type="text" placeholder="Digite a sua busca..." class="form-control search-text"/>
          </div>
        </div>
      </div>
    );
  }
}
