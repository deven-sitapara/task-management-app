import { todoConstants } from "../Constants";
import { todoService } from "../../Services";
import { alertActions } from "./Alert";
//import { history } from "../Helpers";

export const todoActions = {
  create,
  getAll,
  completed,
  delete: _delete,
  update,
};

function create(value) {
  const todo = { id: Date().toString(), text: value, completed: false };

  return (dispatch) => {
    dispatch(request(todo));
    return new Promise(function (resolve, reject) {
      todoService
        .create(todo)
        .then(
          (todo) => {
            dispatch(success(todo));
            //history.push("/login");
            dispatch(alertActions.success("Task created"));
            resolve();
          },
          (error) => {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
            reject(error);
          }
        )
        .catch((error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
          reject(error);
        });
    });
  };

  function request(todo) {
    return { type: todoConstants.TODO_ADD_REQUEST, todo };
  }
  function success(todo) {
    return { type: todoConstants.TODO_ADD_SUCCESS, todo };
  }
  function failure(error) {
    return { type: todoConstants.TODO_ADD_FAILURE, todo, error };
  }
}

function completed(id, completed) {
  return (dispatch) => {
    dispatch(request(id));

    todoService.completed(id, completed).then(
      (todos) => {
        dispatch(success(todos));
        let message = "Task uncompleted successfully";
        if (completed) {
          message = "Task completed successfully";
        }
        dispatch(alertActions.success(message));
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: todoConstants.COMPLETED_REQUEST, id, completed };
  }
  function success(todos) {
    return { type: todoConstants.COMPLETED_SUCCESS, todos };
  }
  function failure(id, error) {
    return { type: todoConstants.COMPLETED_FAILURE, id, error };
  }
}
function getAll() {
  return (dispatch) => {
    dispatch(request());

    todoService.getAll().then(
      (todos) => dispatch(success(todos)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: todoConstants.GETALL_REQUEST };
  }
  function success(todos) {
    return { type: todoConstants.GETALL_SUCCESS, todos };
  }
  function failure(error) {
    return { type: todoConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    todoService.delete(id).then(
      (todos) => {
        dispatch(success(todos));
        dispatch(alertActions.success("Task deleted successfully"));
      },
      (error) => {
        dispatch(failure(id, error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: todoConstants.DELETE_REQUEST, id };
  }
  function success(todos) {
    return { type: todoConstants.DELETE_SUCCESS, todos };
  }
  function failure(id, error) {
    return { type: todoConstants.DELETE_FAILURE, id, error };
  }
}

//update
function update(todo) {
  //const todo = { "id": Date().toString(), "text": value, completed: false };

  return (dispatch) => {
    dispatch(request(todo));

    todoService.update(todo).then(
      (todos) => {
        dispatch(success(todos));
        //history.push("/login");
        dispatch(alertActions.success("Task updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(todo) {
    return { type: todoConstants.EDIT_REQUEST, todo };
  }
  function success(todos) {
    return { type: todoConstants.EDIT_SUCCESS, todos };
  }
  function failure(error) {
    return { type: todoConstants.EDIT_FAILURE, todo, error };
  }
}
