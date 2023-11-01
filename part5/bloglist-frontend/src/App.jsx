import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import { notifySuccess, notifyError } from "./reducers/messageReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import "./app.css";

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
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
      user: updatedBlog.user.id,
      likes: updatedBlog.likes + 1,
    };
    blogService.update(updatedBlog.id, updatedBlog);
    const newBlogs = blogs.map((blog) => {
      if (blog.id === updatedBlog.id) return { ...blog, likes: blog.likes + 1 };
      else return blog;
    });
    setBlogs(newBlogs);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in as", username);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(notifySuccess(`Welcome back ${user.name}!`));
    } catch (exception) {
      console.log("something went wrong");
      dispatch(notifyError("Wrong credentials, try again"));
    }
  };

  const remove = async (blog) => {
    if (window.confirm(`Do you want to delete blog ${blog.title}?`)) {
      await blogService.remove(blog.id);
      const newBlogs = blogs.filter((a) => a.id !== blog.id);
      setBlogs(newBlogs);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
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
