import axios from "axios";

const URL = "http://localhost:3001/persons";

/**
 * Function to get all persons from db.
 * @returns persons json array
 */
const getAll = () => {
    const request = axios.get(URL);
    return request.then((response) => response.data);
};

/**
 * Function to add new person.
 * @returns added person object
 */
const addNewPerson = (newContact) => {
    const request = axios.post(URL, newContact);
    return request.then((response) => response.data);
};

/**
 * Function to remove user from db.
 * @param {*} id users id
 * @returns
 */
const removePerson = (id) => {
    const request = axios.delete(`${URL}/${id}`);
    return request.then((response) => response.status);
};

/**
 * Update persons data
 * @param {*} id Persons id
 * @param {*} newPerson New info
 * @returns updated person data
 */
const updatePerson = (id, newPerson) => {
    const request = axios.put(`${URL}/${id}`, newPerson);
    return request.then((response) => response.data);
};

export default { getAll, addNewPerson, removePerson, updatePerson };
