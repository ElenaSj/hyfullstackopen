import { useParams, useNavigate } from "react-router-dom";
import userService from "../services/users";
import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

const User = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [user, setUser] = useState(null);

  useEffect(() => {
    userService.getUser(id).then((user) => setUser(user));
  }, []);

  return (
    <>
      {user && (
        <div>
          <Typography variant="h3">{user.name}</Typography>
          <Typography variant="h4">Added blogs</Typography>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List>
              {user.blogs.map((blog) => (
                <ListItem key={blog.id}>
                  <ListItemText primary={blog.title} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Button onClick={() => navigate("/users")}>Back</Button>
        </div>
      )}
    </>
  );
};

export default User;
