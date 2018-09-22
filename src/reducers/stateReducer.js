import { LOGIN_USER } from "../actions/types";

const initialState = {
  loggedIn: false,
  user: {
    id: '',
    photoUrl: '',
    name: '',
    family: '',
    alive: true,
    targets: [],
  },
  game: false,
  score: {
    capulets: '',
    montagues: ''
  },
};

export default function stateReducer (state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER :
      return { ...state, user: action.user, loggedIn: action.loggedIn }
    default:
      return state;
  }
}
