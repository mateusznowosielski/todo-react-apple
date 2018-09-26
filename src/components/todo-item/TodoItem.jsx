import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { addTodo,
         removeTodo,
         updateTodo,
         completeTodo } from "actions/todoActions"
import styles from "./less/todo-item.less";


class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    // Setting timeout in case we're creating todo and immediately
    // mark it as completed
    this.timoutId = null;

    // edit mode for a todo that already exists
    // when false we display static paragraph
    // when true we display Input text field
    this.state = { editMode: false };
  }

  /**
   * If the todo is new then on blur input text field component invokes addTodo,
   * if it is existing todo (has id) then component invokes updateTodo.
   *
   * In case user clicks on input checkbox field shortly after user focus out
   * from input text field, function waits 200ms to mark todo as completed.
   *
   * In case user removes entire text from input text field followd by blur
   * component invokes removeTodo.
   **/
  handleBlur = event => {
    this.timeoutId = setTimeout(() => {
      const value = this.refs.todoInput.value;
      if (!this.props.todo.id) {
        if (value) {
          this.refs.todoInput.value = '';
          this.props.addTodo({ value });
        }
      } else {
        if (value) {
          this.setState({ editMode: false });
          this.props.updateTodo({
            id: this.props.todo.id,
            value
          });
        } else {
          this.props.removeTodo(this.props.todo.id);
        }
      }
    }, 200);
  }

  /**
   * Filling new todo input text field with value and hitting Enter
   * will invoke addTodo.
   **/
  handleKeyPress = event => {
    if (event.key === 'Enter' && !this.props.todo.id) {
      const value = this.refs.todoInput.value;
      if (value) {
        this.refs.todoInput.value = '';
        this.props.addTodo({ value });
      }
    }
  }

  /**
   * Changing input checkbox value will result in invoking updateTodo
   * with updated completed flat when todo exist and has id,
   * or in case it's a new todo it will invoke
   * addTodo with value from input text field and completed flag.
   **/
  handleComplete = event => {
    if (this.props.todo.id) {
      this.props.updateTodo({
        id: this.props.todo.id,
        completed: event.target.checked,
      });
    } else {
      clearTimeout(this.timeoutId);
      if (this.refs.todoInput.value) {
        this.props.addTodo({
          value: this.refs.todoInput.value,
          completed: event.target.checked,
        });
        this.refs.todoInput.value = '';
      }
    }
  }

  /**
   * When we click on static paragraph text we want to switch to edit mode
   * end swap it with Input text field.
   **/
  handleStaticTextClick = () => {
    this.setState({ editMode: true });
  }

  /**
   * We need to set a focus back to input field as soon as user clicks
   * on paragraph which after setState will convert to Input text field.
   **/
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.editMode && this.state.editMode) {
      this.refs.todoInput.focus();
    }
  }

  /**
   * We want to clean all Timeount before unmounting.
   **/
  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    return (
      <div className={styles.todoItem}>
        <label className={styles.completeLabel}>
          <input
            type="checkbox"
            onChange={this.handleComplete}
            onClick={this.handleClick}
            className={styles.todoItemComplete}
            checked={this.props.todo.completed}
          />
        <span className={styles.checkmark}></span>
        </label>
        { this.state.editMode || !this.props.todo.id ?
          (
            <input
              type="text"
              ref="todoInput"
              className={styles.todoItemInput}
              defaultValue={this.props.todo.value}
              onBlur={this.handleBlur}
              onKeyPress={this.handleKeyPress}
              placeholder={this.props.todo.id ? '' : 'New item'}
            />
          ) :
          (
            <p
              className={styles.todoItemStatic}
              onClick={this.handleStaticTextClick}
            >
              {this.props.todo.value}
            </p>
          )
        }

      </div>
    );
  }
}


TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    completed: PropTypes.bool,
  }),
};

TodoItem.defaultProps = {
  todo: {
    value: '',
    completed: false,
  },
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (payload) => dispatch(addTodo(payload)),
    removeTodo: (id) => dispatch(removeTodo(id)),
    updateTodo: (payload) => dispatch(updateTodo(payload)),
  }
}

export default connect(null, mapDispatchToProps)(TodoItem);
