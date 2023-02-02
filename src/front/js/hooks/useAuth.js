import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export default function useAuth() {
  // const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [error, setError] = useState(null);
  //set user in context and push them home
  const setUserContext = async () => {
    const token = localStorage.getItem('jwt-token');
    const resp = await fetch(`${process.env.BACKEND_URL}/protected`, {
        method: 'GET',
        headers: { 
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+ token // ⬅⬅⬅ authorization token
        } 
    });

    const data = await resp.json();
    if(resp.ok) {
      actions.storeUser(data);
      // navigate('/private');
    }

    // return await axios
    //   .get("/user")
    //   .then((res) => {
    //     setUser(res.data.currentUser);
    //     history.push("/home");
    //   })
    //   .catch((err) => {
    //     setError(err.response.data);
    //   });
  };
  return {
    setUserContext,
    error,
  };
}
