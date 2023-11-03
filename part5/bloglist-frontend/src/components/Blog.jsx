import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { removeBlog, like } from "../reducers/blogReducer";

const Blog = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const id = useParams().id;
  const user = useSelector((state) => state.user);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    blogService.getBlog(id).then((blog) => setBlog(blog));
  }, []);

  const updateBlog = async (updatedBlog) => {
    updatedBlog = {
      ...updatedBlog,
      likes: updatedBlog.likes + 1,
    };
    setBlog(updatedBlog);
    dispatch(like(updatedBlog));
  };

  const remove = async (blog) => {
    if (window.confirm(`Do you want to delete blog ${blog.title}?`)) {
      dispatch(removeBlog(blog));
      navigate("/");
    }
  };

  const blogStyle = {
    padding: 5,
    border: "solid",
    borderWidth: 1,
    marginTop: 5,
    background: "FloralWhite",
  };

  return (
    <div style={blogStyle} className="blog">
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <p>Blogger: {blog.author}</p>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{" "}
            <button onClick={() => updateBlog(blog)}>like</button>
          </p>
          <p>Added by user {blog.user.name}</p>
          <button onClick={() => navigate("/")}>back</button>
          <h3>comments</h3>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </div>
      )}
      {blog && user.username === blog.user.username && (
        <div>
          <button onClick={() => remove(blog)}>Remove</button>
        </div>
      )}
    </div>
  );
};
export default Blog;
