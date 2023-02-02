import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
      <h1>Hello there!</h1>
    </div>
  );
};
