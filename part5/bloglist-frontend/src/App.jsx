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

import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import Users from "./components/Users";
import UserHeader from "./components/UserHeader";
import User from "./components/User";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import { notifySuccess, notifyError } from "./reducers/messageReducer";
import {
  initializeBlogs,
  createBlog,
  removeBlog,
  like,
} from "./reducers/blogReducer";
import "./app.css";

const App = () => {
  return (
    <Router>
      <div>
        <ErrorMessage />
        <SuccessMessage />
        <h2>blogs</h2>
        <UserHeader />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
