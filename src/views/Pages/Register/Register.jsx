import React, { PureComponent } from "react";
import "../Login/Login.css";
import { connect } from "react-redux";
import { userActions, alertActions } from "../../../Redux/Actions";
import { Link, Redirect } from "react-router-dom";

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.props.clearAlerts();

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.email && user.password) {
      this.props.register(user);
    }
  }

  render() {
    const { registering, alert, registered } = this.props;
    const { user, submitted } = this.state;

    if (registered) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Register</h1>
                      </div>

                      <form
                        className="form-signin"
                        onSubmit={this.handleSubmit}
                      >
                        {alert.message && (
                          <div className={`alert ${alert.type}`}>
                            {alert.message}
                          </div>
                        )}

                        <div
                          className={
                            "form-group" +
                            (submitted && !user.firstName ? " has-error" : "")
                          }
                        >
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            placeholder="First Name"
                            value={user.firstName}
                            onChange={this.handleChange}
                          />
                          {submitted && !user.firstName && (
                            <div className="text-danger">
                              First Name is required
                            </div>
                          )}
                        </div>
                        <div
                          className={
                            "form-group" +
                            (submitted && !user.lastName ? " has-error" : "")
                          }
                        >
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            placeholder="Last Name"
                            value={user.lastName}
                            onChange={this.handleChange}
                          />
                          {submitted && !user.lastName && (
                            <div className="text-danger">
                              Last Name is required
                            </div>
                          )}
                        </div>
                        <div
                          className={
                            "form-group" +
                            (submitted && !user.email ? " has-error" : "")
                          }
                        >
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="email"
                            value={user.email}
                            onChange={this.handleChange}
                          />
                          {submitted && !user.email && (
                            <div className="text-danger">email is required</div>
                          )}
                        </div>
                        <div
                          className={
                            "form-group" +
                            (submitted && !user.password ? " has-error" : "")
                          }
                        >
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={this.handleChange}
                          />
                          {submitted && !user.password && (
                            <div className="text-danger">
                              Password is required
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <button className="btn btn-primary">
                            {registering ? (
                              <span>
                                <span
                                  className="spinner-grow spinner-grow-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Loading...
                              </span>
                            ) : (
                              "Register"
                            )}
                          </button>

                          <Link to="/login" className="btn btn-link">
                            Cancel
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { registering, registered } = state.registration;

  const { alert } = state;

  // console.log("state");
  // console.log(state);

  return { registering, alert, registered };
}

const actionCreators = {
  register: userActions.register,
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(Register);
