import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { showCompletedTodo,
         hideCompletedTodo } from "actions/filterActions";
import styles from "./less/status-bar.less";

const StatusBar = (props) => {
  return (
    <header className={styles.statusBar}>
      <p className={styles.completedIndicator}>
        <span className={styles.completedAmount}>
          {props.todos.filter(todo => todo.completed).length}
        </span>
        Completed
        {(props.todos.filter(todo => todo.completed).length > 0) ?
          (<a
            href=""
            onClick={event => {
                event.preventDefault();
                if (props.showCompleted) {
                  props.hideCompletedTodo();
                } else {
                  props.showCompletedTodo();
                }
              }
            }
            className={styles.showHideSwitch}
          >
            {props.showCompleted ? 'Hide' : 'Show'}
          </a>) : null}
      </p>
    </header>
  );
}

StatusBar.propTypes = {
  todos: PropTypes.array,
  showCompleted: PropTypes.bool,
};

StatusBar.defaultProps = {
  todos: [],
  showCompleted: false,
};

const mapStateToProps = state => {
  return {
    todos: state.todoReducer.todos,
    showCompleted: state.filterReducer.showCompleted,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showCompletedTodo: () => dispatch(showCompletedTodo()),
    hideCompletedTodo: () => dispatch(hideCompletedTodo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
