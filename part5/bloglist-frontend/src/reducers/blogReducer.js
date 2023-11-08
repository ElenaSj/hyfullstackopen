import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notifySuccess, notifyError } from "./messageReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    getBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    deleteBlog(state, action) {
      const blog = action.payload;
      return state.filter((a) => a.id !== blog.id);
    },
    likeBlog(state, action) {
      const likedBlog = action.payload;
      return state.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog));
    },
  },
});

export const { getBlogs, appendBlog, deleteBlog, likeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(getBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(notifySuccess(`Added new blog ${newBlog.title}`));
    } catch (exception) {
      dispatch(
        notifyError(
          "Failed to add blog. Please check that you have filled in title and url",
        ),
      );
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(deleteBlog(blog));
  };
};

export const like = (blog) => {
  return async (dispatch) => {
    const likedBlog = { ...blog, user: blog.user.id };
    await blogService.update(likedBlog.id, likedBlog);
    dispatch(likeBlog(blog));
  };
};

export default blogSlice.reducer;
