import React, { Component } from 'react';
import './TodoItem.css';
import checkImg from '../img/check.svg';
import checkComplete from '../img/checkComplete.svg';
import classNames from 'classnames';

class TodoItem extends Component {
  render() {
    const { item, onClick } = this.props;  // destructuring

    let url = checkImg;
    if(item.isComplete) {
      url = checkComplete;
    }

    return (
      <div className={classNames('TodoItem', {
        'TodoItem-complete': item.isComplete 
      })}>
          <img src={url} onClick={onClick} width="32" height="32" />
          <p>{this.props.item.title}</p>
      </div>
    );
  }
}

export default TodoItem;