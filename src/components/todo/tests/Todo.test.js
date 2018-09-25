import React from 'react';
import { shallow } from 'enzyme';
import { use, expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import configureStore from 'redux-mock-store';

import Todo from "components/todo/Todo";
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

describe('<Todo />', () => {
  let store;
  beforeEach(() => {
    store = initStore();
  });

  it('should render 1 new todo item as initialized', () => {
    const wrapper = shallow(<Todo store={mockStore(store)}/>).dive();
    expect(wrapper.find(TodoItem)).to.have.lengthOf(1);
  });

  it('should render 3 todo items (including new) when 2 uncompleted', () => {
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
    const wrapper = shallow(<Todo store={mockStore(store)}/>).dive();
    expect(wrapper.find(TodoItem)).to.have.lengthOf(3);
  });

  it('should render 2 todo items (including new) when 1 uncompleted and 1 completed', () => {
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
    const wrapper = shallow(<Todo store={mockStore(store)}/>).dive();
    expect(wrapper.find(TodoItem)).to.have.lengthOf(2);
  });

  it('should render 3 todo items (including new) when 1 uncompleted and 1 completed when we show all todos', () => {
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
    const wrapper = shallow(<Todo store={mockStore(store)}/>).dive();
    expect(wrapper.find(TodoItem)).to.have.lengthOf(3);
  });
});
