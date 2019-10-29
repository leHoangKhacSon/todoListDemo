import * as types from '../constants/ActionTypes';

const initialState = 'all';

const option = (state = initialState, action) => {
  switch (action.type) {
    case types.CLICK_OPTION:
      return action.option;
    default:
      return state;
  }
}

export default option;