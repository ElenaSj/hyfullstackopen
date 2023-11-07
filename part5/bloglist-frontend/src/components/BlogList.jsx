import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, createBlog } from "../reducers/blogReducer";
import { Paper, Box } from "@mui/material";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

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

  const bold = {
    fontWeight: "bold",
  };

  const cursor = {
    cursor: "pointer",
  };

  const goToBlog = (id) => {
    navigate(`/blogs/${id}`);
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          textAlign: "center",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        {sortedBlogs.map((blog) => (
          <Paper style={cursor} onClick={() => goToBlog(blog.id)} key={blog.id}>
            <p style={bold}>{blog.title}</p>
            <p>{blog.author}</p>
          </Paper>
        ))}
      </Box>
    </div>
  );
};

export default BlogList;
