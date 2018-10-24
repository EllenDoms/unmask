import { combineReducers } from 'redux';
import gameStateReducer from './gameStateReducer';
import generalReducer from './generalReducer';
import adminReducer from './adminReducer';
import { reducer as FormReducer} from 'redux-form'; //assign to alias FormReducer

const rootReducer = combineReducers({
  game: gameStateReducer,
  general: generalReducer,
  admin: adminReducer,
  form: FormReducer
})

export default rootReducer;
