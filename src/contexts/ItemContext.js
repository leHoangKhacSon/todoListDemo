import React, { createContext, useEffect, useState } from 'react'

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
  const [ todoItems, setTodoItems ] = useState(
    JSON.parse(localStorage.getItem('list')) || []
  )
  // set data to localStorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todoItems))
  }, [todoItems])

  return (
    <ItemContext.Provider value={{ todoItems, setTodoItems }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider
