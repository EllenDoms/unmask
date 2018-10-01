import { combineReducers } from 'redux';
import gameStateReducer from './gameStateReducer';
import existsReducer from './existsReducer';

const rootReducer = combineReducers({
  data: gameStateReducer,
  exists: existsReducer,
})

export default rootReducer;
