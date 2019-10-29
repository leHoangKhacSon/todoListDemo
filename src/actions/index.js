import * as types from '../constants/ActionTypes'

export const clickItem = item => {
  return {
    type: types.CLICK_ITEM,
    item
  }
}

export const addItem = title => {
  return {
    type: types.ADD_ITEM,
    title
  }
}

export const deleteItem = () => {
  return {
    type: types.DELETE_ITEM
  }
}

export const selectAllItem = () => {
  return {
    type: types.SELECT_ALL_ITEM
  }
}

export const clickOption = option => {
  return {
    type: types.CLICK_OPTION,
    option
  }
}