import { todoActions, addTodo, removeTodo, updateTodo } from 'actions/todoActions';

describe('todoActions', () => {
  it('should create an action to add a todo', () => {
    const payload = {
      value: 'Random todo',
      completed: true,
    }
    const expectedAction = {
      type: todoActions.ADD,
      payload
    }
    expect(addTodo(payload)).toEqual(expectedAction);
  })

  it('should create an action to remove a todo', () => {
    const id = 1;
    const expectedAction = {
      type: todoActions.REMOVE,
      id
    }
    expect(removeTodo(id)).toEqual(expectedAction);
  })

  it('should create an action to update a todo', () => {
    const payload = {
      id: 1,
      value: 'Random todo',
      completed: true,
    }
    const expectedAction = {
      type: todoActions.UPDATE,
      payload
    }
    expect(updateTodo(payload)).toEqual(expectedAction);
  })

  it('should create an action to reorder a todo', () => {
    const payload = {
      startIndex: 0,
      endIndex: 1,
    }
    const expectedAction = {
      type: todoActions.UPDATE,
      payload
    }
    expect(updateTodo(payload)).toEqual(expectedAction);
  })
})
