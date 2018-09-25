import reducer from 'reducers/filterReducer'
import { filterActions, showCompletedTodo, hideCompletedTodo } from 'actions/filterActions';

describe('filterReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        showCompleted: false,
      }
    )
  });

  it('should test showing completed', () => {
    expect(
      reducer(undefined, {
        type: filterActions.SHOW,
      })
    ).toEqual(
      {
        showCompleted: true,
      }
    );
  });

  it('should test hiding completed', () => {
    expect(
      reducer(undefined, {
        type: filterActions.HIDE,
      })
    ).toEqual(
      {
        showCompleted: false,
      }
    );
  });
})
