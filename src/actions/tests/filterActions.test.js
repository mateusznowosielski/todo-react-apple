import { filterActions, showCompletedTodo, hideCompletedTodo } from 'actions/filterActions';

describe('filterActions', () => {
  it('should create an action on show completed', () => {
    const expectedAction = {
      type: filterActions.SHOW,
    }
    expect(showCompletedTodo()).toEqual(expectedAction);
  })

  it('should create an action on hide completed', () => {
    const expectedAction = {
      type: filterActions.HIDE,
    }
    expect(hideCompletedTodo()).toEqual(expectedAction);
  })
})
