import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import StatusBar from "components/status-bar/StatusBar";
import TodoItem from "components/todo-item/TodoItem";
import styles from "./less/todo.less";

const Todo = (props) => (
  <div className={styles.todo}>
    <h1 className={styles.headline}>New List</h1>
    <StatusBar />
    <section className={styles.todoViewport}>
      <div className={styles.todoContainer}>
        {
          props.todos.map((todo, index) => {
            if (props.showCompleted || (!props.showCompleted && !todo.completed)) {
              return (
                <TodoItem key={todo.id} todo={todo} />
              )
            }
            return null;
          })
        }
        <TodoItem />
      </div>
    </section>
    <footer>
      <p className={styles.footerNote}>Inspired by Apple MacOS Reminders</p>
    </footer>
  </div>
);

Todo.propTypes = {
  todos: PropTypes.array,
  showCompleted: PropTypes.bool,
};

Todo.defaultProps = {
  todos: [],
  showCompleted: false,
};

const mapStateToProps = state => {
  return {
    todos: state.todoReducer.todos,
    showCompleted: state.filterReducer.showCompleted,
  }
}

export default connect(mapStateToProps)(Todo)
