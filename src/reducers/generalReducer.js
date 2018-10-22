import { LOGIN_USER, GET_GAMES, SET_GAME, LOADING} from "../actions/types";

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
    case GET_GAMES :
      return { ...state, games: action.payload}
    default:
      return state;
  }
}
