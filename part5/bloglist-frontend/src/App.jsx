import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import Users from "./components/Users";
import UserHeader from "./components/UserHeader";
import User from "./components/User";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import "./app.css";

const App = () => {
  return (
    <Container>
      <Router>
        <div>
          <ErrorMessage />
          <SuccessMessage />
          <UserHeader />
          <h1>Blog App</h1>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      </Router>
    </Container>
  );
};

export default App;
