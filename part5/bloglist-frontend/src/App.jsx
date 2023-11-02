import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import { notifySuccess, notifyError } from "./reducers/messageReducer";
import { initializeBlogs, createBlog, removeBlog, like } from "./reducers/blogReducer";
import { logIn, logOut, alreadyLoggedIn } from "./reducers/userReducer";
import "./app.css";

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const blogFormRef = useRef();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [user]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      dispatch(alreadyLoggedIn(loggedUser))
    }
  }, []);

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = {...newBlog, user: user}
      dispatch(createBlog(blog))
      dispatch(notifySuccess(`Added new blog ${blog.title}`));
    } catch (exception) {
      dispatch(notifyError(
        "Failed to add blog. Please check that you have filled in title and url",
      ));

    }
  };

  const updateBlog = async (updatedBlog) => {
    updatedBlog = {
      ...updatedBlog,
      likes: updatedBlog.likes + 1,
    };
    dispatch(like(updatedBlog))
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in as", username);
    dispatch(logIn({username, password}))
      setUsername("");
      setPassword("");
  };

  const remove = async (blog) => {
    if (window.confirm(`Do you want to delete blog ${blog.title}?`)) {
      dispatch(removeBlog(blog))
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(logOut());
    dispatch(notifySuccess("Logged out!"));
  };

  const blogsToSort = [...blogs]

  let sortedBlogs = blogsToSort.sort((a, b) => a.likes - b.likes).toReversed();

  return (
    <div>
      <ErrorMessage />
      <SuccessMessage />
      {user && (
        <div>
          <p>{user.name} is logged in</p>
          <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <NewBlogForm addBlog={addBlog} />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              user={user}
              remove={remove}
            />
          ))}
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

export default App;
