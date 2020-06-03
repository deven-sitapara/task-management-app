import { userConstants } from "../Constants";

//const initialState = { registering: false, registered: false };

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { ...state, registering: true, registered: false };
    case userConstants.REGISTER_SUCCESS:
      return { ...state, registered: true, registering: false };
    case userConstants.REGISTER_FAILURE:
      return { ...state, registering: false, registered: false };
    case userConstants.REGISTER_RESET:
      return { ...state, registering: false, registered: false };
    default:
      return state;
  }
}
