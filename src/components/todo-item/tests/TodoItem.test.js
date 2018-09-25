import React from 'react';
import { mount, shallow } from 'enzyme';
import { use, expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import configureStore from 'redux-mock-store';

import TodoItem from "components/todo-item/TodoItem";

const mockStore = configureStore();

use(chaiEnzyme());

describe('<TodoItem />', () => {
  let store;
  beforeEach(() => {
    store = {};
  });

  if('should render with checkbox and input field', () => {
    const wrapper = shallow(<TodoItem store={mockStore(store)}/>).dive();
    expect(wrapper.find('input[type="text"]')).to.equal(true);
    expect(wrapper.find('input[type="checkbox"]')).to.equal(true);
  });

  it('should test that new todo has no defaultValue', () => {
    const wrapper = shallow(<TodoItem store={mockStore(store)}/>).dive();
    expect(wrapper.find('input[type="text"]').prop('defaultValue')).to.equal('');
  });

  it('should test that new todo does not have selected checkbox', () => {
    const wrapper = shallow(<TodoItem store={mockStore(store)}/>).dive();
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).to.equal(false);
  });

  it('should test that todo input displays value when todo has value in props', () => {
    const todo = { id: 1, value: 'Random todo' };
    const wrapper = shallow(<TodoItem todo={todo} store={mockStore(store)}/>).dive();
    expect(wrapper.find('input[type="text"]').prop('defaultValue')).to.equal(todo.value);
  });

  it('should test that todo checkbox is selected when todo is completed in props', () => {
    const todo = { id: 1, value: 'Random todo', completed: true };
    const wrapper = shallow(<TodoItem todo={todo} store={mockStore(store)}/>).dive();
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).to.equal(todo.completed);
  });

});
