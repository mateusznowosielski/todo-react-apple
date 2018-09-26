import { todoActions } from "actions/todoActions";

const initState = {
  todos: [],
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case todoActions.ADD:
      return {
        todos: state.todos.concat({
          value: action.payload.value,
          completed: !!action.payload.completed,
          id: state.todos.reduce((finalId, todo) => Math.max(todo.id, finalId), 0) + 1,
        })
      }
    case todoActions.REMOVE:
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.id),
      }
    case todoActions.UPDATE:
      return {
        todos: state.todos.map(item => {
          if(action.payload && item.id === action.payload.id) {
            return {...item, ...action.payload}
          }
          return item;
        })
      }
    case todoActions.REORDER:
      const todos = [...state.todos];
      const [removed] = todos.splice(action.payload.startIndex, 1);
      todos.splice(action.payload.endIndex, 0, removed);
      return {
        todos,
      }
    default: return state
  }
  return state;
}

export default reducer;
