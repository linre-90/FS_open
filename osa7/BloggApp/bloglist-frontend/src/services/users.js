import axios from "axios";

const baseUrl = "/api/users";

// Get all users.
const getUsers = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

// Get single user
const getUser = async (id) => {
    const response = await axios.get(baseUrl);
    return response.data.filter((x) => {
        return x.id === id;
    })[0];
};

export default { getUsers, getUser };
