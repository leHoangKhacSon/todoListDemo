import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import TodoItem from '../components/TodoItem';
import * as actions from '../actions/index';
import App from '../App';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppContainer = ({ items, option, clickItem, addItem, deleteItem, selectAllItem, clickOption }) => {
  const [newItem, setNewItem] = useState('');
  const inputElement = useRef();
  // auto focus input
  useEffect(() => {
    inputElement.current.focus();
  })
  // event click item use to check item
  const onItemClicked = item => {
    return event => {
      clickItem(item);
    }
  }
  // event onKeyUp use to fetch value user enter
  const onKeyUp = event => {
    if (event.keyCode === 13) {
      let text = event.target.value;
      if (!text) return;
      text = text.trim();
      if (!text) return;
      addItem(text);
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
    selectAllItem();
  }
  // handler click option
  const onOptionClicked = option => {
    return e => {
      e.preventDefault();
      clickOption(option);
    }
  }
  // clear Ccomplete click
  const onClearCompleteClicked = () => {
    deleteItem();
  }
  let Items = items;
  // filter items if click active
  if (option === 'active') {
    Items = Items.filter((item) => {
      return item.isComplete === false;
    });
  }
  // filter items if click complete 
  if (option === 'complete') {
    Items = Items.filter((item) => {
      return item.isComplete === true;
    });
  }
  // count Items
  const leng = Items.length;
  const lengComplete = Items.filter((item) => {
    return item.isComplete === true;
  }).length;
  const showTodoItem = items => {
    return items.length > 0
      ?
      items.map(item => (
        <TodoItem
          key={uuid()}
          item={item}
          onClick={onItemClicked(item)}
        />
      ))
      :
      'nothing here'
  }
  const showHeader = () => {
    return (
      <Header
        onAllSelected={onAllSelected}
        onDeleteInputClicked={onDeleteInputClicked}
        onChange={onChange}
        onKeyUp={onKeyUp}
        newItem={newItem}
        inputElement={inputElement}
      />
    )
  }
  const showFooter = () => {
    return (
      <Footer
        leng={leng}
        currentItem={option}
        onOptionClicked={onOptionClicked}
        lengComplete={lengComplete}
        onClearCompleteClicked={onClearCompleteClicked}
      />
    )
  }
  
  return (
    <App>
      {showHeader()}
      {showTodoItem(Items)}
      {showFooter()}
    </App>
  );
}

const mapStatetoProps = state => {
  return {
    items: state.items,
    option: state.option
  }
}

const mapDispatchtoProps = (dispatch, props) => {
  return {
    clickItem: item => {
      dispatch(actions.clickItem(item));
    },
    addItem: title => {
      dispatch(actions.addItem(title));
    },
    deleteItem: () => {
      dispatch(actions.deleteItem());
    },
    selectAllItem: () => {
      dispatch(actions.selectAllItem());
    },
    clickOption: option => {
      dispatch(actions.clickOption(option));
    }
  }
}

AppContainer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      isComplete: PropTypes.bool
    })
  ).isRequired,
  option: PropTypes.string.isRequired
}

export default connect(mapStatetoProps, mapDispatchtoProps)(AppContainer);
