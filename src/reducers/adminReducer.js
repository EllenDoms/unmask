import { USERS_ENROLMENT } from "../actions/types";

const initialState = {
  registered: 0,
  ready: 0
};

export default function gameStateReducer (state = initialState, action) {
  switch(action.type) {
    case USERS_ENROLMENT :
      return { ...state, registered: action.registered, ready: action.ready }
    default:
      return state;
  }
}
