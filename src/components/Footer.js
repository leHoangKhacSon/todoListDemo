import React from 'react';
import classNames from 'classnames';
import moduleName from 'module';

import './Footer.css';

const Footer = ({ leng, currentItem, onOptionClicked, lengComplete, onClearCompleteClicked }) => {
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
        onClick={ onOptionClicked('all') } >All</a>
        <a key="active" className={classNames({
          'border-link': currentItem === "active"
        })}
        href="/" 
        onClick={ onOptionClicked('active') } >Active</a>
        <a key="complete" className={classNames({
          'border-link': currentItem === "complete"
        })}
        href="/" 
        onClick={ onOptionClicked('complete') } >Complete</a>
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