import { combineReducers } from 'redux';
import stateReducer from './stateReducer';

const rootReducer = combineReducers({
  data: stateReducer,
})

export default rootReducer;
