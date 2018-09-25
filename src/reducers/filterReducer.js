import { filterActions } from "actions/filterActions";

const initState = {
  showCompleted: false,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case filterActions.SHOW:
      return {
        showCompleted: true,
      }
    case filterActions.HIDE:
      return {
        showCompleted: false,
      }
    default: return state
  }
  return state;
}

export default reducer;
