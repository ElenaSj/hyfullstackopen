import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, alreadyLoggedIn } from "../reducers/userReducer";
import { notifySuccess } from "../reducers/messageReducer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Toolbar } from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";

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

  const linkSx = {
    paddingRight: 5,
    "&:hover": {
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  const handleLogin = async () => {
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
          <Box
            sx={{
              flexGrow: 1,
              width: 1 / 2,
              display: "inline-flex",
            }}
          >
            <Typography
              sx={linkSx}
              variant="h6"
              color="inherit"
              component="div"
              onClick={() => navigate("/")}
            >
              Blogs
            </Typography>
            <Typography
              sx={linkSx}
              variant="h6"
              color="inherit"
              component="div"
              onClick={() => navigate("/users")}
            >
              Users
            </Typography>
          </Box>
          {user && (
            <>
              <Typography style={padding}>{user.name} is logged in</Typography>
              <Button
                onClick={() => handleLogout()}
                style={padding}
                variant="contained"
                size="small"
              >
                Logout
              </Button>
            </>
          )}
          {!user && (
            <>
              <StyledTextField
                style={padding}
                required
                id="outlined-required"
                label="Username"
                size="small"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <StyledTextField
                required
                style={padding}
                id="outlined-password"
                label="Password"
                type="password"
                size="small"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              <Button
                onClick={() => handleLogin()}
                style={padding}
                variant="contained"
                size="small"
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default UserHeader;
