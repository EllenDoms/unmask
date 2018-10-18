import { combineReducers } from 'redux';
import gameStateReducer from './gameStateReducer';
import generalReducer from './generalReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  data: gameStateReducer,
  general: generalReducer,
  admin: adminReducer,
})

export default rootReducer;
