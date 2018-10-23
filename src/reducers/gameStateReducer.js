import { GAME_STATUS, SCORE_STATUS, UPDATE_USER, UPDATE_INFO } from "../actions/types";

const initialState = {
  user: {
    role: 'team',
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
    case UPDATE_INFO :
      return { ...state, teams: action.teams, words: action.words }
    default:
      return state;
  }
}
