import { useState, useEffect } from "react";

import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import Notification from "./components/notification";
import service from "./services/service";

const App = () => {
    /******  state  *******/
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setnewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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
            // <TODO REMOVE IN 3.17>
            window.alert(
                "Unsupported operation: update number. Updating number is not yet supported"
            );
            return;
            //  </TODO REMOVE IN 3.17>

            //prettier-ignore
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
                service
                    .updatePerson(foundDuplicate.id, newContact)
                    .then((data) => {
                        setPersons(
                            persons.filter((value) => {
                                return value.id !== foundDuplicate.id
                            })
                            .concat(data)
                            .sort((a, b) =>  {return a.id - b.id;})
                        );
                        showNotification(`Updated ${foundDuplicate.name}`, false)
                    }).catch(error => showNotification(`Information of ${foundDuplicate.name} has already been removed from server`, true));
            }
        } else {
            service.addNewPerson(newContact).then((data) => {
                setPersons(persons.concat(data));
                setnewNumber("");
                setNewName("");
                showNotification(`Added ${newContact.name}`, false);
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
                if (data === 204) {
                    setPersons(
                        persons.filter((value) => {
                            return value.id !== person.id;
                        })
                    );
                    showNotification(`Deleted ${person.name}`, false);
                }
            });
        }
    };

    /**
     * Display notification component to user.
     * @param {*} message message to display in notification.
     * @param {*} error is error or not
     */
    const showNotification = (message, error) => {
        if (error) {
            setErrorMessage(message);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        } else {
            setSuccessMessage(message);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification
                message={successMessage}
                isError={false}
            ></Notification>
            <Notification message={errorMessage} isError={true}></Notification>
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
