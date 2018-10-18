import { GAME_STATUS, SCORE_STATUS, UPDATE_USER } from "../actions/types";

const initialState = {
  user: {
    admin: false,
    id: '',
    name: '',
    family: '',
    selfieUrl: '',
    targettedBy: [],
    alive: '',
    targets: [],
  },
  playing: '',
  score: {
    capulet: '',
    montague: ''
  },
};

export default function gameStateReducer (state = initialState, action) {
  switch(action.type) {

    case GAME_STATUS :
      return { ...state, playing: action.payload }
    case SCORE_STATUS :
      return { ...state, score: action.payload }
    case UPDATE_USER :
      return { ...state, user: {...state.user, ...action.payload} }
    default:
      return state;
  }
}
