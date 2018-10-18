import { LOGIN_USER, SET_GAME, LOADING, LOGOUT_USER } from "../actions/types";

const initialState = {
  loading: true,
  gameExists: '',
  user: {
    loggedIn: ''
  }
};

export default function generalReducer (state = initialState, action) {
  switch(action.type) {
    case SET_GAME :
      return { ...state, gameExists: action.payload }
    case LOADING :
      return { ...state, loading: action.payload }
    case LOGIN_USER :
      return { ...state, user: action.payload}
    case LOGOUT_USER :
      return { ...state, user: action.payload}
    default:
      return state;
  }
}
