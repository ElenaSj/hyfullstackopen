import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import Blog from "./components/Blog";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import Users from "./components/Users";
import UserHeader from "./components/UserHeader";
import User from "./components/User";
import { notifySuccess, notifyError } from "./reducers/messageReducer";
import {
  initializeBlogs,
  createBlog,
  removeBlog,
  like,
} from "./reducers/blogReducer";
import "./app.css";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [user]);

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = { ...newBlog, user: user };
      dispatch(createBlog(blog));
      dispatch(notifySuccess(`Added new blog ${blog.title}`));
    } catch (exception) {
      dispatch(
        notifyError(
          "Failed to add blog. Please check that you have filled in title and url",
        ),
      );
    }
  };

  const updateBlog = async (updatedBlog) => {
    updatedBlog = {
      ...updatedBlog,
      likes: updatedBlog.likes + 1,
    };
    dispatch(like(updatedBlog));
  };

  const remove = async (blog) => {
    if (window.confirm(`Do you want to delete blog ${blog.title}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  const blogsToSort = [...blogs];

  let sortedBlogs = blogsToSort.sort((a, b) => a.likes - b.likes).toReversed();

  return (
    <Router>
      <div>
        <ErrorMessage />
        <SuccessMessage />
        <h2>blogs</h2>
        <UserHeader />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
        {user && (
          <div>
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
      </div>
    </Router>
  );
};

export default App;
