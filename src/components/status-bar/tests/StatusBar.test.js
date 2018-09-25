import React from 'react';
import { shallow } from 'enzyme';
import { use, expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import configureStore from 'redux-mock-store';

import StatusBar from "components/status-bar/StatusBar";

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

describe('<StatusBar />', () => {
  let store;
  beforeEach(() => {
    store = initStore();
  });

  it('should render 0 for 0 completed todos and no show/hide switch', () => {
    const wrapper = shallow(<StatusBar store={mockStore(store)}/>).dive();
    expect(wrapper.find('span')).to.have.text('0');
    expect(wrapper.find('a').exists()).to.equal(false);
  });

  it('should render 1 for 1 completed todo and show switch with label Show', () => {
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
    const wrapper = shallow(<StatusBar store={mockStore(store)}/>).dive();
    expect(wrapper.find('span')).to.have.text('1');
    expect(wrapper.find('a')).to.have.text('Show');
  });

  it('should render 2 for 2 completed todo and show switch with label Hide', () => {
    store.todoReducer.todos = [
      {
        id: 1,
        value: "first",
        completed: true,
      },
      {
        id: 2,
        value: "second",
        completed: true,
      }
    ];
    store.filterReducer.showCompleted = true;
    const wrapper = shallow(<StatusBar store={mockStore(store)}/>).dive();
    expect(wrapper.find('span')).to.have.text('2');
    expect(wrapper.find('a')).to.have.text('Hide');
  });

});
