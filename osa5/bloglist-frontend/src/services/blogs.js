import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

const update = async (blog) => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
    return response.data;
};

const deleteBlog = async (blogid) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${blogid}`, config);
    return response.data;
};

export default { getAll, create, setToken, update, deleteBlog };
