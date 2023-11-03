import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const getBlog = async (id) => {
  const response = await axios.get(baseUrl + `/${id}`);
  return response.data;
};

const update = async (id, updatedBlog) => {
  const response = await axios.put(baseUrl + `/${id}`, updatedBlog);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  const returnBLog = { ...response.data, user: newBlog.user };
  return returnBLog;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(baseUrl + `/${id}`, config);
};

export default { getAll, setToken, create, update, remove, getBlog };
