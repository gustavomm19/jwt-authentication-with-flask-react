import React, { useContext, useState } from "react";
// import { useHistory } from 'react-router-dom';
import { Context } from "../store/appContext";
import useAuth from "../hooks/useAuth";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const { setUserContext } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const resp = await fetch(
        `${process.env.BACKEND_URL}/token`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(resp.ok);
      console.log(resp.status);

      const data = await resp.json();
      console.log(data);
      if (resp.ok) {
        localStorage.setItem("jwt-token", data.token);
        actions.storeToken(data.token);
        await setUserContext();
      }
      else setError(data.msg); 
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      alert(`Something went wrong: ${e}`);
    }
  };

  return (
    <div>
      <div className="mt-5 w-50 m-auto">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              required
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          {!loading ? (
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          ) : (
            <div className="text-center">...lOading</div>
          )}
        </form>
      </div>
    </div>
  );
};
