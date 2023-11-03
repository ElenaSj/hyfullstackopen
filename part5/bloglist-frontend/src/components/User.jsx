import { useParams, useNavigate } from "react-router-dom";
import userService from "../services/users";
import { useState, useEffect } from "react";

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
          <h3>{user.name}</h3>
          <h4>Added blogs</h4>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
          <button onClick={() => navigate("/users")}>Back</button>
        </div>
      )}
    </>
  );
};

export default User;
