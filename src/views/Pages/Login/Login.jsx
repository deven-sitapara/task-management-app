import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions, alertActions } from "../../../Redux/Actions";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.props.resetRegistered();
    this.props.clearAlerts();
    this.state = {
      username: "",
      password: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearAlerts();

    this.setState({ submitted: true });
    const { username, password } = this.state;

    if (username && password) {
      this.props
        .login(username, password)
        .then(() => {
          this.props.history.push("/dashbord");
        })
        .catch((error) => {});
    }
  }

  componentDidMount = () => {};
  render() {
    const { loggingIn, alert } = this.props;
    const { username, password, submitted } = this.state;

    const user_error_class =
      submitted && !username ? "form-control border-danger" : "form-control";
    const pass_error_class =
      submitted && !password ? "form-control border-danger" : "form-control";

    // const user_error_text =
    //   submitted && !username
    //     ? (<div className="text-danger">Username is required</div>)
    //     : "";
    // const pass_error_text =
    //   submitted && !password
    //     ? (<div className="text-danger">Password is required</div>)
    //     : "";
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
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>

                      <form onSubmit={this.handleSubmit}>
                        {alert.message && (
                          <div className={`alert ${alert.type}`}>
                            {alert.message}
                          </div>
                        )}

                        <div className="form-group">
                          <input
                            type="text"
                            name="username"
                            id="username"
                            className={user_error_class}
                            placeholder="Email address"
                            autoFocus
                            onChange={(e) => {
                              this.setState({ username: e.target.value });
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            id="password"
                            className={pass_error_class}
                            placeholder="Password"
                            onChange={(e) => {
                              this.setState({ password: e.target.value });
                            }}
                          />{" "}
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>

                        <button
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                        >
                          {loggingIn ? (
                            <span>
                              <span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Loading...
                            </span>
                          ) : (
                            "Sign In"
                          )}
                        </button>
                        <hr />
                      </form>
                      <div className="text-center">
                        <Link to="/register" className="small">
                          Create an Account!
                        </Link>
                      </div>
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
  const { loggingIn, loggedIn } = state.authentication;

  const { alert } = state;

  return { loggingIn, loggedIn, alert };
}
const mapAction = {
  login: userActions.login,

  user_logout: userActions.user_logout,

  clearAlerts: alertActions.clear,

  resetRegistered: userActions.resetRegistered,
};

export default withRouter(connect(mapState, mapAction)(Login));
