import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";

const App = () => {
    /******  state  *******/
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setnewNumber] = useState("");
    const [filter, setFilter] = useState("");

    /******  Hooks  *******/
    // fetch initial data
    useEffect(() => {
        //prettier-ignore
        axios
            .get("http://localhost:3001/persons")
            .then((response) => {
                setPersons(response.data);
            });
    }, []);

    /******  Event handlers  *******/
    /**
     * function to set controlled input value
     * @param {*} event
     */
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    /**
     * function to set controlled input value
     * @param {*} event
     */
    const handleNumberChange = (event) => {
        setnewNumber(event.target.value);
    };

    /**
     * function to set controlled input value
     * @param {*} event
     */
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    /**
     * Function to add contact in phonebook
     * @param {*} event
     */
    const addToBook = (event) => {
        event.preventDefault();
        const newContact = { name: newName, number: newNumber };
        const foundDuplicate = persons.find(
            (contact) => contact.name === newContact.name
        );

        if (foundDuplicate) {
            alert(`${newContact.name} is already added to phonebook`);
        } else {
            setPersons(persons.concat(newContact));
            setnewNumber("");
            setNewName("");
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter
                filter={filter}
                changeFunction={handleFilterChange}
            ></Filter>

            <h2>Add a new</h2>
            <PersonForm
                formSubmit={addToBook}
                nameValue={newName}
                numberValue={newNumber}
                nameChangeHandler={handleNameChange}
                numberChangeHandler={handleNumberChange}
            ></PersonForm>

            <h3>Numbers</h3>
            <Persons arrayToFilter={persons} filter={filter}></Persons>
        </div>
    );
};

export default App;
