import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { userActions } from "../../../Redux/Actions";
//import Header from "../../Components/Header/Header";
import "./Dashboard.css";
import TodoContainer from "../../../Containers/Todo/TodoContainer";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import Header from "../../Header/Header";
//import TodoContainer from "../../Containers/Todo/TodoContainer";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sb_show: true,
      sb_mini: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMiniSidebar = this.handleMiniSidebar.bind(this);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    //    this.resize();
  }

  handleToggleSidebar = () => {
    this.setState({ sb_show: !this.state.sb_show });
  };
  handleMiniSidebar = () => {
    this.setState({ sb_mini: !this.state.sb_mini });
  };

  handleLogout = (e) => {
    e.preventDefault();

    this.props.user_logout();

    return this.props.history.push("/login");
  };

  componentDidMount = () => {
    // window.addEventListener("resize", this.resize.bind(this));
    // this.resize();
  };

  // resize() {
  //   if (window.innerWidth <= 1024) {
  //     this.setState({ sb_mini: true });
  //   } else if (window.innerWidth > 1024) {
  //     this.setState({ sb_mini: false });
  //   }

  //   if (window.innerWidth > 768) {
  //     this.setState({ sb_show: true });
  //   } else {
  //     this.setState({ sb_show: false });
  //     if (window.innerWidth > 1024) {
  //       this.setState({ sb_mini: true });
  //     }
  //   }
  // }

  render() {
    let sidebar_class =
      "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ";

    sidebar_class += this.state.sb_mini ? " toggled" : "";
    sidebar_class += !this.state.sb_show ? " d-none" : "";

    return (
      <React.Fragment>
        <div id="page-top">
          <div id="wrapper">
            {/*   Sidebar */}
            <ul className={sidebar_class} id="accordionSidebar">
              {/*   Sidebar - Brand */}
              <Link
                className="sidebar-brand d-flex align-items-center justify-content-center"
                to="/dashboard"
              >
                <div className="sidebar-brand-icon">
                  <i className="far fa-building"></i>
                </div>
                <div className="sidebar-brand-text mx-3">
                  Company <sup>saas</sup>
                </div>
              </Link>

              {/*   Divider */}
              <hr className="sidebar-divider my-0" />

              {/*   Nav Item - Dashboard */}
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="fas fa-fw fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="/logout"
                  className="nav-link"
                  onClick={this.handleLogout}
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw "></i>
                  <span>Logout</span>
                </a>
              </li>
              <hr className="sidebar-divider d-none d-md-block" />

              <div className="text-center d-none d-md-inline">
                <button
                  className="rounded-circle border-0"
                  id="sidebarToggle"
                  onClick={this.handleMiniSidebar}
                ></button>
              </div>
            </ul>
            {/*   End of Sidebar */}

            {/*   Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/*   Main Content */}
              <div id="content">
                {/*   Topbar */}
                <Header
                  {...this.props}
                  handleToggleSidebar={this.handleToggleSidebar}
                />
                {/*   End of Topbar */}

                {/*   Begin Page Content */}
                <div className="container-fluid">
                  {/*   Page Heading */}

                  <React.Suspense fallback={<Loading />}>
                    <TodoContainer {...this.props} />
                  </React.Suspense>
                </div>
                {/*   /.container-fluid */}
              </div>
              {/*   End of Main Content */}

              {/*   Footer */}
              <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                  <div className="copyright text-center my-auto">
                    <span>Copyright &copy; Task SAAS 2020</span>
                  </div>
                </div>
              </footer>
              {/*   End of Footer */}
            </div>
            {/*   End of Content Wrapper */}
          </div>
          {/*   End of Page Wrapper */}

          {/*   Scroll to Top Button*/}
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>

          {/*   Logout Modal*/}
          <div
            className="modal fade"
            id="logoutModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          ></div>
        </div>
      </React.Fragment>
    );
  }
}

//map state to props
function mapState(state) {
  return {
    user: state.authentication.user,
  };
}

//map action to props
const mapAction = (dispatch) => {
  return {
    user_logout: () => dispatch(userActions.user_logout()),
  };
};

export default connect(mapState, mapAction)(Dashboard);
