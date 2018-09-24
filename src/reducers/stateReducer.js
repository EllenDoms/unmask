import { LOGIN_USER, LOADING, GAME_STATUS, SCORE_STATUS } from "../actions/types";

const initialState = {
  loggedIn: false,
  loading: true,
  user: {
    admin: false,
    id: '',
    photoUrl: '',
    name: '',
    family: '',
    alive: true,
    targets: [],
  },
  game: '',
  score: {
    capulets: '',
    montagues: ''
  },
};

export default function stateReducer (state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER :
      return { ...state, user: action.user, loggedIn: action.loggedIn}
    case LOADING :
      return { ...state, loading: action.loading }
    case GAME_STATUS :
      return { ...state, game: action.payload }
    case SCORE_STATUS :
      return { ...state, score: action.payload }
    default:
      return state;
  }
}
