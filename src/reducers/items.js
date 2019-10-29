import * as types from '../constants/ActionTypes'

const data = JSON.parse(localStorage.getItem('items'));
const inititalState = data ? data : [];

const items = (state = inititalState, action) => {
  switch (action.type) {
    case types.CLICK_ITEM:
      const index = state.indexOf(action.item);
      const newClickState = [
        ...state.slice(0, index),
        { ...action.item, isComplete: !action.item.isComplete },
        ...state.slice(index + 1)
      ];
      localStorage.setItem('items', JSON.stringify(newClickState));
      return newClickState;
    case types.ADD_ITEM:
      const newAddState = [
        { title: action.title, isComplete: false },
        ...state
      ];
      localStorage.setItem('items', JSON.stringify(newAddState));
      return newAddState;
    case types.DELETE_ITEM:
      const newDeleteState = state.filter(item => {
        return item.isComplete === false;
      });
      localStorage.setItem('items', JSON.stringify(newDeleteState));
      return newDeleteState;
    case types.SELECT_ALL_ITEM:
      const newSelectState = state.map(item => {
        item.isComplete = true;
        return item;
      });
      localStorage.setItem('items', JSON.stringify(newSelectState));
      return newSelectState;
    default:
      return state;
  }
}

export default items;