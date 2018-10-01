import { LOGIN_USER, LOADING, GAME_STATUS, SCORE_STATUS, USER_STATUS, LOGOUT_USER } from "../actions/types";

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
      console.log("Action has been fired with user", action.user);
      return { ...state, user: action.user, loggedIn: action.loggedIn}
    case LOGOUT_USER :
      console.log("Logged out")
      return { ...state, loggedIn: action.loggedIn}
    case LOADING :
      return { ...state, loading: action.loading }
    case GAME_STATUS :
      return { ...state, game: action.payload }
    case SCORE_STATUS :
      return { ...state, score: action.payload }
    case USER_STATUS :
      console.log("User status called:", action.payload)
      return { ...state, user: action.payload }
    default:
      return state;
  }
}
