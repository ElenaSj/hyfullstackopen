import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, alreadyLoggedIn } from "../reducers/userReducer";
import { notifySuccess } from "../reducers/messageReducer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Toolbar } from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";

const UserHeader = () => {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      dispatch(alreadyLoggedIn(loggedUser));
    }
  }, []);

  const padding = {
    paddingRight: 5,
  };

  const StyledTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "white",
    },
    input: {
      color: "white",
    },
    label: {
      color: "#e0e0e0",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in as", username);
    dispatch(logIn({ username, password }));
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    navigate("/");
    dispatch(logOut());
    dispatch(notifySuccess("Logged out!"));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, width: 3 / 4, display: "inline-flex" }}>
            <Typography
              style={padding}
              variant="h6"
              color="inherit"
              component="div"
            >
              Blogs
            </Typography>
            <Typography
              style={padding}
              variant="h6"
              color="inherit"
              component="div"
            >
              Users
            </Typography>
          </Box>
          <StyledTextField
            style={padding}
            required
            id="outlined-required"
            label="Username"
            size="small"
          />
          <StyledTextField
            required
            style={padding}
            id="outlined-password"
            label="Password"
            type="password"
            size="small"
          />
          <Button style={padding} variant="contained" size="small">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user && (
        <span>
          {user.name} is logged in
          <button onClick={handleLogout}>logout</button>
        </span>
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
