import { combineReducers } from 'redux';
import gameStateReducer from './gameStateReducer';
import existsReducer from './existsReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  data: gameStateReducer,
  exists: existsReducer,
  admin: adminReducer,
})

export default rootReducer;
