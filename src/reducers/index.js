import { combineReducers } from 'redux'

import items from './items';
import option from './option';

const appReducers = combineReducers({
  items,
  option
});

export default appReducers;