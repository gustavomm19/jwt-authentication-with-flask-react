import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
// import Loading from "./../components/Loading";
export default function PrivateRoute(props) {
  const { store, actions } = useContext(Context);
  const { component: Component, ...rest } = props;
  // if (isLoading) {
  //   return <Loading />;
  // }
  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  //redirect if there is no user
  return <Redirect to="/login" />;
}
