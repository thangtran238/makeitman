import React from "react";
import { Clock } from "grommet";
export default function Header() {
  const logOut = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-block d-xl-none">
            <a
              className="nav-link sidebartoggler nav-icon-hover"
              id="headerCollapse"
              href="javascript:void(0)"
            >
              <i className="ti ti-menu-2" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-icon-hover" href="javascript:void(0)">
              <i className="ti ti-bell-ringing" />
            </a>
          </li>
        </ul>
        <div
          className="navbar-collapse justify-content-end px-0"
          id="navbarNav"
        >
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
            <Clock type="digital" />
            <button onClick={() => logOut()} className="btn btn-primary ml-2">
              Log out
            </button>
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon-hover"
                href="javascript:void(0)"
                id="drop2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></a>
              <div
                className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                aria-labelledby="drop2"
              >
                <div className="message-body">
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 dropdown-item"
                  >
                    <i className="ti ti-user fs-6" />
                    <p className="mb-0 fs-3">My Profile</p>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 dropdown-item"
                  >
                    <i className="ti ti-mail fs-6" />
                    <p className="mb-0 fs-3">My Account</p>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 dropdown-item"
                  >
                    <i className="ti ti-list-check fs-6" />
                    <p className="mb-0 fs-3">My Task</p>
                  </a>

                  <a
                    href="./authentication-login.html"
                    className="btn btn-outline-primary mx-3 mt-2 d-block"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
