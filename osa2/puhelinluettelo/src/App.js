import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    /**
     * Event to set controlled input value
     * @param {*} event
     */
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    /**
     * Function to add contact in phonebook
     * @param {*} event
     */
    const addToBook = (event) => {
        event.preventDefault();
        const newContact = { name: newName };
        setPersons(persons.concat(newContact));
        setNewName("");
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addToBook}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((contact) => {
                return <p key={contact.name}>{contact.name}</p>;
            })}
        </div>
    );
};

export default App;
