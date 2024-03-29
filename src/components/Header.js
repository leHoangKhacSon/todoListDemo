import React from 'react';

import checkAll from '../img/checkAll.svg';
import deleteInput from '../img/delete.svg';
import './Header.css';

const Header = (props) => {
  const { onAllSelected, onDeleteInputClicked, onChange, onKeyUp, newItem, inputElement } = props;
  const url = checkAll;
  const urlDel = deleteInput;

  return (
    <div className="Header">
      <img
        src={url}
        onClick={onAllSelected}
        width="32"
        height="32"
        alt="select all" />
      <input
        type="text"
        ref={inputElement}
        placeholder="What needs to be done?"
        value={newItem}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      {newItem && <img
        src={urlDel}
        onClick={onDeleteInputClicked}
        width="24"
        height="24"
        alt="imageDelete"
      />}
    </div>
  )
}

export default Header;