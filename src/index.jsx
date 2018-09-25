import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux'

import Todo from "components/todo/Todo";
import rootReducer from 'reducers';
import "less/main.less";

const store = createStore(rootReducer)

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Todo />
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("index"));
