export const todoActions = {
  ADD: "ADD_TODO",
  REMOVE: "REMOVE_TODO",
  UPDATE: "UPDATE_TODO",
}

export const addTodo = payload => ({
  type: todoActions.ADD,
  payload,
});

export const removeTodo = id => ({
  type: todoActions.REMOVE,
  id,
});

export const updateTodo = payload => ({
  type: todoActions.UPDATE,
  payload,
});
