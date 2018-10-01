import { GAME_EXISTS } from "../actions/types";

const initialState = {
  game: ''
};

export default function existsReducer (state = initialState, action) {
  switch(action.type) {
    case GAME_EXISTS :
      return { game: action.payload }
    default:
      return state;
  }
}
