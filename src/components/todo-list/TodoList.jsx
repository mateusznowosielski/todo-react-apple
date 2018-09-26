import React from "react";
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from "react-redux";

import TodoItem from "components/todo-item/TodoItem";
import { reorderTodo } from "actions/todoActions";
import styles from "./less/todo-list.less";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'white' : 'transparent',
  opacity: isDragging ? .7 : 1,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
});

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Event execute when we drag ends and user drops it into a todoViewport.
   * Becuase our list of visible todos and all todos have different indices
   * when we display only uncompleted todos (showCompleted = false) we need
   * to revalidate indices to proper values.
   * In the end we dispatch action REORDER_TODO
   **/
  onDragEnd = event => {
    // dropped outside the list
    if (!event.destination) {
      return;
    }

    const { todos } = this.props;
    const visibleTodos = this.getVisibleTodos();
    const startIndex = event.source.index;
    const endIndex = event.destination.index;

    this.props.reorderTodo({
      startIndex: todos.indexOf(visibleTodos[startIndex]),
      endIndex: todos.indexOf(visibleTodos[endIndex]),
    });
  }

  /**
   * Returns the list of visible todos depending on todo.completed flag
   * and based on showCompleted flag.
   **/
  getVisibleTodos = () => this.props.todos.filter(todo => {
    return this.props.showCompleted ||
      (!this.props.showCompleted && !todo.completed);
  });

  render() {
    const { showCompleted, todos } = this.props;
    const visibleTodos = this.getVisibleTodos();

    return (
      <section className={styles.todoViewport}>
        <div className={styles.todoContainer}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {visibleTodos.map((todo, index) => (
                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                      {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <TodoItem key={todo.id} todo={todo} />
                          </div>
                        )
                      }
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <TodoItem />
        </div>
      </section>
    )
  }
};

TodoList.propTypes = {
  todos: PropTypes.array,
  showCompleted: PropTypes.bool,
};

TodoList.defaultProps = {
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
    reorderTodo: (payload) => dispatch(reorderTodo(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
