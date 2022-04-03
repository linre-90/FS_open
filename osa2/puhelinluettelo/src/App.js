import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-1231244" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setnewNumber] = useState("");

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
            <h2>Phonebook</h2>
            <form onSubmit={addToBook}>
                <div>
                    name:
                    <input value={newName} onChange={handleNameChange} />
                    <br></br>
                    number:
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((contact) => {
                return (
                    <p key={contact.name}>
                        {contact.name} {contact.number}
                    </p>
                );
            })}
        </div>
    );
};

export default App;
