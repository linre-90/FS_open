import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

/**
 * Blog related services for front end.
 * Services call backend api endpoints directly.
 */

// Sets user token created on login
const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

// Returns all blogs.
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

// Creates new blog.
const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

// Update blog based on id.
const update = async (blog) => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
    return response.data;
};

// Delete blog. Requires user to be also blog creator.
const deleteBlog = async (blogid) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${blogid}`, config);
    return response.data;
};

export default { getAll, create, setToken, update, deleteBlog };
