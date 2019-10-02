import React from 'react';
import classNames from 'classnames';

import './Footer.css';

const Footer = (props) => {
  const { 
    leng, currentItem,
    onAllItemClicked, onActiveItemClicked,
    onCompleteItemClicked, lengComplete,
    onClearCompleteClicked 
  } = props;

  return (
    <div className="Footer">
      <p>
        {leng} Items
      </p>
      <div className="clickItem">
        <a key="all" className={classNames({
          'border-link': currentItem === "all"
        })}
        href="/" 
        onClick={ onAllItemClicked } >All</a>
        <a key="active" className={classNames({
          'border-link': currentItem === "active"
        })}
        href="/" 
        onClick={ onActiveItemClicked } >Active</a>
        <a key="complete" className={classNames({
          'border-link': currentItem === "complete"
        })}
        href="/" 
        onClick={ onCompleteItemClicked } >Complete</a>
      </div>
      { 
        lengComplete > 0 
        && 
        <a key="clear" 
        href="/" 
        onClick={ onClearCompleteClicked } >Clear Complete</a> 
      }
    </div>
  )
}

export default Footer;