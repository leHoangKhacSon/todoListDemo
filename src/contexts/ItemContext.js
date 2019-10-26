import React, { createContext, useEffect, useState, useReducer } from 'react'
import { ItemReducer } from '../reducers/ItemReducer';

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
  const [ todoItems, dispatch ] = useReducer(
    ItemReducer,
    [],
    () => {
      const localData = localStorage.getItem('list');
      return localData ? JSON.parse(localData) : []
    }
  )
  // set data to localStorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todoItems))
  }, [todoItems])

  return (
    <ItemContext.Provider value={{ todoItems, dispatch }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider
