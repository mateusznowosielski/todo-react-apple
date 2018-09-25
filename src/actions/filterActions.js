export const filterActions = {
  SHOW: "SHOW_COMPLETED",
  HIDE: "HIDE_COMPLETED",
}

export const showCompletedTodo = () => ({
  type: filterActions.SHOW,
});

export const hideCompletedTodo = () => ({
  type: filterActions.HIDE,
});
