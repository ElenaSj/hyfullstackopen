import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, createBlog } from "../reducers/blogReducer";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogStyle = {
    padding: 5,
    border: "solid",
    borderWidth: 1,
    marginTop: 5,
    background: "FloralWhite",
  };

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

  const blogsToSort = [...blogs];

  let sortedBlogs = blogsToSort.sort((a, b) => a.likes - b.likes).toReversed();

  return (
    <div>
      {user && (
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <NewBlogForm addBlog={addBlog} />
        </Togglable>
      )}
      {sortedBlogs.map((blog) => (
        <div style={blogStyle} className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}, {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
