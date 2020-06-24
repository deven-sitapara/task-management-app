import { userConstants } from "../Constants";
import { userService } from "../../Services";
import { alertActions } from "./Alert";
//import { history } from "../Helpers";

export const userActions = {
  login,
  user_logout,
  register,
  resetRegistered,
  getAll,
  delete: _delete
};

function login(username, password) {
  return dispatch => {
    // https://github.com/devatsrs/react-redux-links
    //https://www.bacancytechnology.com/blog/3-react-architecture-practices
    //https://www.sitepoint.com/react-architecture-best-practices/
    return new Promise(function(resolve, reject) {
      dispatch(request({ username }));
      userService
        .login(username, password)
        .then(
          user => {
            dispatch(success(user));
            //history.push("/dashbord");
            resolve();
          },
          error => {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
            reject(error);
          }
        )
        .catch(error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
          reject(error);
        });
    });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function user_logout() {
  return dispatch => {
    userService.logout();

    dispatch({ type: userConstants.LOGOUT });
  };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success());
        //history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        console.log(error);
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function resetRegistered() {
  return dispatch => {
    dispatch({ type: userConstants.REGISTER_RESET });
  };
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id).then(
      user => dispatch(success(id)),
      error => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
