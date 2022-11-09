import axios from "axios";

const baseUrl = "/api/users";

const getUsers = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const getUser = async (id) => {
    const response = await axios.get(baseUrl);
    return response.data.filter((x) => {
        return x.id === id;
    })[0];
};

export default { getUsers, getUser };
