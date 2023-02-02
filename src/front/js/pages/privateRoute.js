import React, { useContext } from "react";
import { Route, Navigate, Outlet, useLocation  } from "react-router-dom";
import { Context } from "../store/appContext";
import { Login } from "./login";
// import Loading from "./../components/Loading";
export default function PrivateRoute({ children }) {
  const { store, actions } = useContext(Context);
  let location = useLocation();
  console.log('store.user');
  console.log(store.user);
  // if (isLoading) {
  //   return <Loading />;
  // }
  // if (store.user) {
  //   return <Route {...rest} render={(props) => <Component {...props} />} />;
  // }
  //redirect if there is no user
  // return store.user ? <Outlet /> : <Navigate to="/login" />;
  if(!store.user) {
    return <Navigate to="/login" state={{ from: location}} replace />
  }
  return children
}
