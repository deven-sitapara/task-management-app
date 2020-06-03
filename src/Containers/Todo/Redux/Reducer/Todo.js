import { todoConstants } from "../Constants";

const initialState = { todos: [] };
export function todo(state = initialState, action) {
  switch (action.type) {
    //get all
    case todoConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.todos,
      };
    case todoConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // Add
    case todoConstants.TODO_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoConstants.TODO_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.todos,
      };
    case todoConstants.TODO_ADD_FAILURE:
      return {
        ...state,
        loading: false,
      };

    //Edit @TODO
    case todoConstants.TODO_EDIT:
      return {
        ...state,
        todos: action.todos,
      };

    //delete
    case todoConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoConstants.DELETE_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        loading: false,
      };

    case todoConstants.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    //mark completed
    case todoConstants.COMPLETED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoConstants.COMPLETED_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.todos,
      };
    case todoConstants.COMPLETED_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    //update
    case todoConstants.EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoConstants.EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.todos,
      };
    case todoConstants.EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
