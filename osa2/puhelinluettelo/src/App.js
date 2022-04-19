import { useState, useEffect } from "react";

import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import service from "./services/service";

const App = () => {
    /******  state  *******/
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setnewNumber] = useState("");
    const [filter, setFilter] = useState("");

    /******  Hooks  *******/
    // fetch initial data
    useEffect(() => {
        service.getAll().then((data) => setPersons(data));
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
     * Function to add contact in phonebook or update number if person exists.
     * @param {*} event
     */
    const addToBook = (event) => {
        event.preventDefault();
        const newContact = { name: newName, number: newNumber };
        const foundDuplicate = persons.find(
            (contact) => contact.name === newContact.name
        );
        if (foundDuplicate) {
            //prettier-ignore
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
                service
                    .updatePerson(foundDuplicate.id, newContact)
                    .then((data) => {
                        setPersons(
                            persons.filter((value) => {
                                return value.id != foundDuplicate.id
                            })
                            .concat(data)
                            .sort((a, b) =>  {return a.id - b.id;})
                        );
                    });
            }
        } else {
            service.addNewPerson(newContact).then((data) => {
                setPersons(persons.concat(data));
                setnewNumber("");
                setNewName("");
            });
        }
    };

    /**
     * callback to delete user from db.
     * @param {*} id users id
     */
    const deleteUser = (person) => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            service.removePerson(person.id).then((data) => {
                if (data === 200) {
                    setPersons(
                        persons.filter((value) => {
                            return value.id !== person.id;
                        })
                    );
                }
            });
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
            <Persons
                arrayToFilter={persons}
                filter={filter}
                removeCallback={deleteUser}
            ></Persons>
        </div>
    );
};

export default App;
