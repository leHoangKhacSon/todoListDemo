import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './TodoItem.css';
import checkImg from '../img/check.svg';
import checkComplete from '../img/checkComplete.svg';

const TodoItem = ({ item, onClick }) => {
  let url = checkImg;
  if (item.isComplete) {
    url = checkComplete;
  }

  return (
    <div className={classNames('TodoItem', {
      'TodoItem-complete': item.isComplete
    })}>
      <img src={url} onClick={onClick} width="32" height="32" alt="click-item" />
      <p>{item.title}</p>
    </div>
  )
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired
  }),
  onClick: PropTypes.func.isRequired
};

export default TodoItem;