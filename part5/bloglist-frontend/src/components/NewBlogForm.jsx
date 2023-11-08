import { useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const NewBlogForm = ({ addBlog }) => {
  NewBlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
  };

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const create = () => {
    let newBlog = {
      title: title,
      author: author,
      url: url,
    };
    addBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>New blog</h2>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            type="text"
            label="Blog title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div>
          <TextField
            type="text"
            label="Blog author"
            value={author}
            onChange={(ev) => setAuthor(ev.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            type="text"
            label="Blog url"
            value={url}
            onChange={(ev) => setUrl(ev.target.value)}
          />
        </div>
      </Box>
      <Button onClick={() => create()}>create</Button>
    </div>
  );
};

export default NewBlogForm;
