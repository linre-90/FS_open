import axios from "axios";

const baseUrl = "/api/login";

const login = async (userdata) => {
    const response = await axios.post(baseUrl, userdata);
    return response.data
}

export default{login};