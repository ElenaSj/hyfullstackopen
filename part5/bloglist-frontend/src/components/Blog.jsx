import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { removeBlog, like } from "../reducers/blogReducer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const Blog = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const id = useParams().id;
  const user = useSelector((state) => state.user);
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

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

  const commentBlog = async () => {
    const commentedBlog = await blogService.comment(blog.id, comment);
    setBlog(commentedBlog);
    setComment("");
  };

  const remove = async (blog) => {
    if (window.confirm(`Do you want to delete blog ${blog.title}?`)) {
      dispatch(removeBlog(blog));
      navigate("/");
    }
  };

  return (
    <div>
      {blog && (
        <div>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Added by user {blog.user.name}
              </Typography>
              <Typography variant="h5">{blog.title}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Author: {blog.author}
              </Typography>
              <Typography variant="h6">Likes: {blog.likes}</Typography>

              <Typography variant="body1">{blog.url}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => updateBlog(blog)}>
                like
              </Button>
              {blog && user && user.username === blog.user.username && (
                <Button onClick={() => remove(blog)}>Delete blog</Button>
              )}
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate("/")}
              >
                back
              </Button>
            </CardActions>
            <CardContent>
              <Typography variant="h5">Comments</Typography>
              {blog.comments.map((comment) => (
                <Typography variant="body1" key={comment}>
                  • {comment}
                </Typography>
              ))}
            </CardContent>
            <CardActions>
              <TextField
                value={comment}
                onChange={(ev) => setComment(ev.target.value)}
              />
              <Button size="small" onClick={() => commentBlog()}>
                Add comment
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
};
export default Blog;
