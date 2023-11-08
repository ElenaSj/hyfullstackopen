import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, createBlog } from "../reducers/blogReducer";
import { Paper, Box, Typography } from "@mui/material";

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
    blogFormRef.current.toggleVisibility();
    const blog = { ...newBlog, user: user };
    dispatch(createBlog(blog));
  };

  const goToBlog = (id) => {
    navigate(`/blogs/${id}`);
  };

  const blogsToSort = [...blogs];

  let sortedBlogs = blogsToSort.sort((a, b) => a.likes - b.likes).toReversed();

  return (
    <div>
      <Typography variant="h2">Blogs</Typography>
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
          <Paper
            sx={{
              "&:hover": {
                cursor: "pointer",
                boxShadow: 5,
              },
            }}
            onClick={() => goToBlog(blog.id)}
            key={blog.id}
          >
            <Typography fontWeight="bold" variant="body1">
              {blog.title}
            </Typography>
            <Typography variant="body1">{blog.author}</Typography>
          </Paper>
        ))}
      </Box>
    </div>
  );
};

export default BlogList;
