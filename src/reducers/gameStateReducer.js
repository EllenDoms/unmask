import { LOGIN_USER, LOADING, GAME_STATUS, SCORE_STATUS, UPDATE_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  loggedIn: false,
  loading: true,
  user: {
    admin: false,
    id: '',
    photoUrl: '',
    name: '',
    family: '',
    selfieUrl: '',
    targettedBy: [],
    alive: '',
    targets: [],
  },
  game: '',
  score: {
    capulet: '',
    montague: ''
  },
};

export default function gameStateReducer (state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER :
      return { ...state, user: action.user, loggedIn: action.loggedIn}
    case LOGOUT_USER :
      return { ...state, loggedIn: action.loggedIn}
    case LOADING :
      return { ...state, loading: action.loading }
    case GAME_STATUS :
      return { ...state, game: action.payload }
    case SCORE_STATUS :
      return { ...state, score: action.payload }
    case UPDATE_USER :
      return { ...state, user: {...state.user, ...action.payload} }
    default:
      return state;
  }
}
