import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import useAuth from "../hooks/useAuth";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { logOut } = useAuth();
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {store.user ?  (
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logOut();
                  }}
                >
                  Logout
                </a>
              </li>
            ) : (
              <>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/login">
                    Log in
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/signup">
                    Sign up
                  </a>
                </li>
              </>
            )}
          </ul>
          {/* <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};
