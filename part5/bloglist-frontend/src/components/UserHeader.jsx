import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, alreadyLoggedIn } from "../reducers/userReducer";
import { notifySuccess } from "../reducers/messageReducer";
import { useState, useEffect } from "react";

const UserHeader = () => {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      dispatch(alreadyLoggedIn(loggedUser));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in as", username);
    dispatch(logIn({ username, password }));
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(logOut());
    dispatch(notifySuccess("Logged out!"));
  };

  return (
    <div>
      {user && (
        <div>
          <p>{user.name} is logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}

      {!user && (
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      )}
    </div>
  );
};

export default UserHeader;