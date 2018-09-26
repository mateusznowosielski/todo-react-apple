import React from 'react';
import { shallow } from 'enzyme';
import { use, expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import configureStore from 'redux-mock-store';

import TodoList from "components/todo-list/TodoList";
import TodoItem from "components/todo-item/TodoItem";

const mockStore = configureStore();

use(chaiEnzyme());

const initStore = () => {
  return {
    todoReducer: {
      todos: [],
    },
    filterReducer: {},
  }
}

describe('<TodoList />', () => {
  let store;
  beforeEach(() => {
    store = initStore();
  });

  it('should return 0 visible todos as initialized', () => {
    const wrapper = shallow(<TodoList store={mockStore(store)}/>).dive();
    expect(wrapper.instance().getVisibleTodos()).to.have.lengthOf(0);
  });

  it('should return 2 visible todos for 2 uncompleted todos', () => {
    store.todoReducer.todos = [
      {
        id: 1,
        value: "first",
      },
      {
        id: 2,
        value: "second",
      }
    ];
    const wrapper = shallow(<TodoList store={mockStore(store)}/>).dive();
    expect(wrapper.instance().getVisibleTodos()).to.have.lengthOf(2);
  });

  it('should return 1 visible todos for 1 uncompleted and 1 completed todos', () => {
    store.todoReducer.todos = [
      {
        id: 1,
        value: "first",
      },
      {
        id: 2,
        value: "second",
        completed: true,
      }
    ];
    const wrapper = shallow(<TodoList store={mockStore(store)}/>).dive();
    expect(wrapper.instance().getVisibleTodos()).to.have.lengthOf(1);
  });

  it('should return 2 visible todos for 1 uncompleted and 1 completed todos when showCompleted is true', () => {
    store.todoReducer.todos = [
      {
        id: 1,
        value: "first",
      },
      {
        id: 2,
        value: "second",
        completed: true,
      }
    ];
    store.filterReducer.showCompleted = true;
    const wrapper = shallow(<TodoList store={mockStore(store)}/>).dive();
    expect(wrapper.instance().getVisibleTodos()).to.have.lengthOf(2);
  });
});
