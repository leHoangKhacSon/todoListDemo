export const ItemReducer = (state, action) => {
  switch(action.type) {
    case 'CLICK_ITEM':
      const index = state.indexOf(action.item);
      return [
        ...state.slice(0, index),
        { ...action.item, isComplete: !action.item.isComplete },
        ...state.slice(index + 1)
      ]
    case 'ADD_ITEM':
      return [
        { title: action.title, isComplete: false},
        ...state
      ]
    case 'DELETE_ITEM':
      return state.filter(item => {
        return item.isComplete === false;
      })
    case 'SELECT_ALL_ITEM':
      return state.map(item => {
        item.isComplete = true;
        return item;
      })
    default: 
      return state;
  }
}