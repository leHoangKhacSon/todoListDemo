import React, { useState, useEffect, useRef, useContext } from 'react';

import './App.css';
import TodoItem from './components/TodoItem';
import Header from './components/Header';
import Footer from './components/Footer';
import { ItemContext } from './contexts/ItemContext';

const App = () => {
  const { todoItems, dispatch } = useContext(ItemContext);
  const [ newItem, setNewItem ] = useState('');
  const [ currentItem, setCurrentItem ] = useState('all');
  const inputElement = useRef();
  // auto focus input
  useEffect(() => {
    inputElement.current.focus();
  })
  // event click item use to check item
  const onItemClicked = item => {
    return event => {
      dispatch({type: 'CLICK_ITEM', item})
    }
  }
  // event onKeyUp use to fetch value user enter
  const onKeyUp = event => {
    if(event.keyCode === 13) {
      let text = event.target.value;
      if(!text) return;
      text = text.trim();
      if(!text) return;
      dispatch({type: 'ADD_ITEM', title: text});
      setNewItem('');
    }
  }
  // handler change input
  const onChange = event => {
    setNewItem(event.target.value);
  }
  // click delete input
  const onDeleteInputClicked = () => {
    setNewItem('');
  }
  // click item select all
  const onAllSelected = () => {
    dispatch({type: 'SELECT_ALL_ITEM'});
  }
  // handler click option
  const onOptionClicked = option => {
    return e => {
      e.preventDefault();
      setCurrentItem(option);
    }
  }
  // clear Ccomplete click
  const onClearCompleteClicked = () => {
    dispatch({type: 'DELETE_ITEM'});
  }
  let Items = todoItems;
  // filter todoItems if click active
  if(currentItem === 'active') {
    Items = Items.filter((item) => {
      return item.isComplete === false;
    });
  }
  // filter todoItems if click complete 
  if(currentItem === 'complete') {
    Items = Items.filter((item) => {
      return item.isComplete === true;
    });
  }
  // count Items
  const leng = Items.length;
  const lengComplete = Items.filter((item) => {
    return item.isComplete === true;
  }).length;

  return (  // react element
    <div className="App">
      <div className="title-app">todo list</div>
      <Header 
        onAllSelected={onAllSelected}
        onDeleteInputClicked={onDeleteInputClicked}
        onChange={onChange}
        onKeyUp={onKeyUp}
        newItem={newItem}
        inputElement={inputElement}
      />
      {Items.length > 0 && Items.map((item, index) => (
        <TodoItem 
        key={index} 
        item={item} 
        onClick={ onItemClicked(item) } />
        ))}
      {Items.length === 0 && 'nothing here'}
      <Footer 
        leng={leng}
        currentItem={currentItem}
        onOptionClicked={onOptionClicked}
        lengComplete={lengComplete}
        onClearCompleteClicked={onClearCompleteClicked}
      />
    </div>
  );
}

export default App;
