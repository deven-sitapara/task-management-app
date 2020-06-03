import React, { useState, useEffect, useRef } from "react";
import {
  FormControlLabel,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  Snackbar,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import "./style.css";
import CanvasJSReact from "./canvasjs.react";
import { connect } from "react-redux";
import { todoActions } from "../../Redux/Actions/Todo";
import MuiAlert from "@material-ui/lab/Alert";
import _ from "lodash";

const MessageBox = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let message = "";
  if (props.type === "alert-error" || props.type === "alert-danger") {
    message = (
      <Alert onClose={handleClose} severity="error">
        {props.children}
      </Alert>
    );
  } else if (props.type === "alert-warning") {
    message = (
      <Alert onClose={handleClose} severity="warning">
        {props.children}
      </Alert>
    );
  } else if (props.type === "alert-info") {
    message = (
      <Alert onClose={handleClose} severity="info">
        {props.children}
      </Alert>
    );
  } else if (props.type === "alert-success") {
    message = (
      <Alert onClose={handleClose} severity="success">
        {props.children}
      </Alert>
    );
  }

  return (
    <Snackbar open={open} autoHideDuration={300000} onClose={handleClose}>
      {message}
    </Snackbar>
  );
};

const TaskChart = ({ tasks }) => {
  let completed = tasks.filter((task) => task.completed === true).length;
  let total = tasks.length;
  let completedper = ((completed / total) * 100).toFixed(2);
  let remainingper = (100 - completedper).toFixed(2);

  const options = {
    animationEnabled: true,
    exportEnabled: false,
    height: 120,
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: [
          { y: completedper, label: "Completed" },
          { y: remainingper, label: "Remaining" },
        ],
      },
    ],
  };
  return (
    <div className="row no-gutters align-items-center">
      <div className="col mr-2">
        <CanvasJSReact.CanvasJSChart options={options} />
      </div>
    </div>
  );
};

const TasksCompleted = ({ tasks }) => {
  const completed = tasks.filter((task) => task.completed === true).length;
  const per_task = (completed / tasks.length).toFixed(1) * 100;
  const style = {
    width: per_task + "%",
  };
  return (
    <div className="row no-gutters align-items-center">
      <div className="col mr-2">
        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
          Task Completed
        </div>
        <div className="row no-gutters align-items-center">
          <div className="col-auto">
            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
              {completed}/ {tasks.length}
            </div>
          </div>
          <div className="col">
            <div className="progress  progress-sm mr-2">
              <div
                className="progress-bar bg-info"
                role="progressbar"
                style={style}
                aria-valuenow={per_task}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-auto">
        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
      </div>
    </div>
  );
};

const TasksLatest = ({ tasks }) => {
  const latest = 3;
  return (
    <div className="row no-gutters align-items-center">
      <div className="col mr-2">
        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
          Latest Tasks
        </div>
        <div className="row no-gutters align-items-center">
          <div className="col-auto">
            <div className="mb-0 mr-3 text-gray-800">
              <ul className="pl-0 list-group">
                {tasks.slice(0, latest).map((task) => {
                  return (
                    <li
                      key={task.id}
                      className="border-0 p-1 list-group-item d-flex align-items-center"
                    >
                      {task.completed ? (
                        <i className="far fa-check-circle "></i>
                      ) : (
                        <i className="far fa-circle "></i>
                      )}
                      <span className="pl-1">{task.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-auto">
        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
      </div>
    </div>
  );
};

const NewTaskModal = ({ show, handleShow, handleClose, handleAdd }) => {
  const [task, settask] = useState("");

  function handlechange(value) {
    settask(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose(false);
    handleAdd(task);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={show}
    >
      <DialogTitle id="simple-dialog-title">+ New Task</DialogTitle>
      <div className=" pl-4 pr-4 pb-4    ">
        <form className="form-signin" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="task"
              id="task"
              className="form-control"
              placeholder="Task Name"
              autoFocus
              onChange={(e) => handlechange(e.target.value)}
            />
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            + New Task
          </button>
        </form>
      </div>
    </Dialog>
  );
};

const NoTask = ({ newTask, handleShow }) => {
  return (
    <div className="row h-100">
      <div className="my-auto mx-auto col-sm-12 col-lg-4 col-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-sm-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              You have no task
            </h6>
          </div>
          <div className="card-body">
            <button className="btn btn-sm btn-primary " onClick={handleShow}>
              + New Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Todo = ({ todo, update, handleCompleted, remove }) => {
  const wrapperRef = useRef(null);

  const [show, setShow] = useState(false);

  const [newTask, setNewTask] = useState(todo.text);

  const KEY_ESCAP = 27;

  const handleKeyDown = (e) => {
    if (e.keyCode === KEY_ESCAP) {
      // escape key maps to keycode `27`
      setShow(false);
    }
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e, todo) => {
    e.preventDefault();

    const new_todo = { ...todo, text: newTask };
    update(new_todo);
    setShow(false);
  };

  //onoutside click hide edit box
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(false); //                    alert("You clicked outside of me!");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  //call useOutsideAlerter when first time loaded
  useOutsideAlerter(wrapperRef);

  return (
    <li className="list-group-item" key={todo.id}>
      <div className="row">
        <div className="col-12 col-md-8 col-lg-10 d-flex flex-row">
          {show ? (
            <form
              ref={wrapperRef}
              onSubmit={(e) => handleSubmit(e, todo)}
              className="d-flex w-100"
            >
              <div className="col-10 col-md-10 ">
                <input
                  type="text"
                  name="todo_text"
                  className="form-control mr-3"
                  defaultValue={todo.text}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
              <div className="col-2 col-md-2 ">
                <button className="btn   btn-primary  ">
                  <svg
                    className="bi bi-check-box"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.5 13A1.5 1.5 0 003 14.5h10a1.5 1.5 0 001.5-1.5V8a.5.5 0 00-1 0v5a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h8a.5.5 0 000-1H3A1.5 1.5 0 001.5 3v10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          ) : (
            <FormControlLabel
              className={todo.completed ? "line_through w-100" : "w-100 "}
              name="task_checkbox"
              onDoubleClick={() => setShow(true)}
              control={
                <Checkbox
                  checked={todo.completed ? true : false}
                  onChange={(e) => handleCompleted(todo.id, e.target.checked)}
                  color="default"
                />
              }
              label={todo.text}
            />
          )}
        </div>

        <div className="col-10 col-md-4 col-lg-2 text-right">
          <IconButton aria-label="update" onClick={() => setShow(true)}>
            <Edit fontSize="small" />
          </IconButton>

          <IconButton aria-label="delete" onClick={() => remove(todo.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </div>
      </div>
    </li>
  );
};

const TodoList = ({ todos, handleShow, handleCompleted, update, remove }) => {
  const [newList, setNewList] = React.useState([]);

  const KEY_ESCAP = 27;

  const handleKeyDown = (e) => {
    if (e.keyCode === KEY_ESCAP) {
      // escape key maps to keycode `27`
      e.target.value = "";
    }
  };
  React.useEffect(() => {
    setNewList([...todos]);
  }, [todos]);

  ///let newList = [...todos];
  function handleSearch(search) {
    let _newList = [];

    // If the search bar isn't empty
    if (search !== "") {
      // Use .filter() to determine which items should be displayed
      // based on the search terms
      _newList = todos.filter((item) => {
        // change current item to lowercase
        const lc = item.text.toLowerCase();
        // change search term to lowercase
        const filter = search.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      _newList = todos;
    }
    // Set the filtered state based on what our rules added to newList
    //newList = _newList;
    setNewList(_newList);
  }

  const todoNode = newList.map((value) => (
    <Todo
      key={value.id}
      update={update}
      handleCompleted={handleCompleted}
      todo={value}
      remove={remove}
    />
  ));

  let addNewButton = "";
  if (!_.isEmpty(todos)) {
    addNewButton = (
      <div className=" form-inline form-sm-block form-md-block">
        <div className="mr-2 input-group-sm">
          <input
            type="text"
            name="search"
            className="form-control"
            placeholder="Search by tasks name"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="mr-0">
          <button
            onClick={handleShow}
            className="btn btn-sm btn-primary text-nowrap"
            type="button"
          >
            + New Task
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-sm-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">Task List</h6>
        <div className="dropdown no-arrow">{addNewButton}</div>
      </div>
      <div className="card-body">{todoNode}</div>
    </div>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class TodoContainer extends React.PureComponent {
  state = {
    show: false,
  };

  // { "id": 1, "text": "This is task 1", completed: true },
  // { "id": 2, "text": "This is task 2", completed: false },
  // { "id": 3, "text": "This is task 3", completed: false },
  // { "id": 4, "text": "This is task 4", completed: false },
  // { "id": 5, "text": "This is task 5", completed: false },

  handleShow = (e) => this.setState({ show: true });
  handleClose = (e) => this.setState({ show: false });

  load_data = () => {
    this.props.getAll();
  };

  componentDidMount = () => {
    this.load_data();
  };

  render() {
    const { todos, alert, loading } = this.props;

    let messageBox = "",
      todoList = "",
      newTaskModal = "",
      noTask = "",
      widgets = "";

    if (!_.isEmpty(todos)) {
      widgets = (
        <div className="row">
          <div className="col-xl-4 col-md-4 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <TasksCompleted tasks={todos} />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <TasksLatest tasks={todos} />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <TaskChart tasks={todos} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (_.isEmpty(todos) && !loading) {
      noTask = (
        <NoTask newTask={this.props.handleAdd} handleShow={this.handleShow} />
      );
    }
    if (!loading) {
      newTaskModal = (
        <NewTaskModal
          show={this.state.show}
          handleShow={this.handleShow}
          handleClose={this.handleClose}
          handleAdd={this.props.handleAdd}
        ></NewTaskModal>
      );
    }
    if (!_.isEmpty(todos)) {
      todoList = (
        <TodoList
          todos={todos}
          update={this.props.handleUpdate}
          handleShow={this.handleShow}
          handleCompleted={this.props.handleCompleted}
          remove={this.props.handleRemove}
        />
      );
    }
    if (!_.isEmpty(alert.message) && !loading) {
      messageBox = <MessageBox type={alert.type}>{alert.message}</MessageBox>;
    }
    return (
      <div className="">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h4 className="h4 mb-0 text-gray-800">Task Dashboard</h4>
        </div>
        {widgets}

        {noTask}

        {newTaskModal}

        {todoList}

        {messageBox}
      </div>
    );
  }
}

function mapState(state) {
  const { todos, loading } = state.todo;
  const { alert } = state;

  return { todos, alert, loading };
}

const actionCreators = {
  handleAdd: todoActions.create,
  getAll: todoActions.getAll,
  handleCompleted: todoActions.completed,
  handleRemove: todoActions.delete,
  handleUpdate: todoActions.update,
};

export default connect(mapState, actionCreators)(TodoContainer);
