import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resp = await fetch(
        `${process.env.BACKEND_URL}/user`,
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
      // console.log(resp.text());
      const data = await resp.json();
      console.log(data);
      setLoading(false);
      if (resp.ok) setResult(data.result);
      else alert(`Something went wrong: ${data.msg}`);
    } catch(e){
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
          {!result ? (
            <>
              {!loading ? (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              ) : (
                <div className="text-center">...Loading</div>
              )}
            </>
          ) : (
            <div className="text-center">Registered succesfully!</div>
          )}
        </form>
      </div>
    </div>
  );
};
