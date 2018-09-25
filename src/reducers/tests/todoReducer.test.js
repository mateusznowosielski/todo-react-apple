import reducer from 'reducers/todoReducer'
import { todoActions, addTodo, removeTodo, updateTodo } from 'actions/todoActions';

describe('todoReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ todos: [] });
  })

  it('should test adding todos', () => {
    expect(
      reducer(undefined, {
        type: todoActions.ADD,
        payload: {
          value: 'Random todo',
        },
      })
    ).toEqual({
      todos: [
        {
          id: 1,
          value: 'Random todo',
          completed: false,
        }
      ]
    });

    expect(
      reducer({
        todos: [
          {
            id: 1,
            value: 'Random todo',
            completed: false,
          }
        ]
      }, {
        type: todoActions.ADD,
        payload: {
          value: 'Random todo 2',
          completed: true,
        },
      })
    ).toEqual({
      todos: [
        {
          id: 1,
          value: 'Random todo',
          completed: false,
        },
        {
          id: 2,
          value: 'Random todo 2',
          completed: true,
        }
      ]
    });
  });

  it('should test removing todos', () => {
    expect(
      reducer(undefined, {
        type: todoActions.REMOVE,
        id: 1,
      })
    ).toEqual({
      todos: [],
    });

    expect(
      reducer({
        todos: [
          {
            id: 1,
            value: 'Random todo',
            completed: false,
          },
          {
            id: 2,
            value: 'Random todo 2',
            completed: true,
          }
        ]
      }, {
        type: todoActions.REMOVE,
        id: 1,
      })
    ).toEqual({
      todos: [
        {
          id: 2,
          value: 'Random todo 2',
          completed: true,
        }
      ]
    });
  });

  it('should test updating todos', () => {
    expect(
      reducer(undefined, {
        type: todoActions.UPDATE,
        payload: {
          id: 1,
          value: "Random todo",
        },
      })
    ).toEqual({
      todos: [],
    });

    expect(
      reducer({
        todos: [
          {
            id: 1,
            value: 'Random todo',
            completed: false,
          }
        ]
      }, {
        type: todoActions.UPDATE,
        payload: {
          id: 1,
          value: "Completed random todo",
          completed: true,
        },
      })
    ).toEqual({
      todos: [
        {
          id: 1,
          value: 'Completed random todo',
          completed: true,
        }
      ]
    });
  });
})
