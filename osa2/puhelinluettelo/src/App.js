import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setnewNumber] = useState("");
    const [filter, setFilter] = useState("");

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

    /**
     * Function to filter people by names
     * @param {*} arrayToFilter
     * @returns
     */
    const filterItems = (arrayToFilter) => {
        return arrayToFilter.filter((element) =>
            element.name.toLowerCase().includes(filter.toLowerCase())
        );
    };

    return (
        <div>
            <h1>Phonebook</h1>

            <div>
                filter shown with
                <input value={filter} onChange={handleFilterChange} />
            </div>

            <h2>Add a new</h2>

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

            <h3>Numbers</h3>

            {filterItems(persons).map((person) => {
                return (
                    <p key={person.name}>
                        {person.name} {person.number}
                    </p>
                );
            })}
        </div>
    );
};

export default App;
