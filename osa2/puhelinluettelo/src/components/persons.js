/**
 * Displays single person
 * @param {*} person person object
 * @returns
 */
const SinglePerson = ({ person, removeCallback }) => {
    return (
        <>
            <p key={person.name}>
                {person.name} {person.number}
                <button
                    onClick={() => {
                        removeCallback(person);
                    }}
                >
                    delete
                </button>
            </p>
        </>
    );
};

/**
 * Shows listing of filtered numbers
 * @param {*} arrayToFilter array to run through filter
 * @param {*} filter filter string
 * @returns
 */
const Persons = ({ arrayToFilter, filter, removeCallback }) => {
    /**
     * Function to filter people by names
     * @param {*} listToFilter
     * @returns filtered list
     */

    const filterItems = (listToFilter) => {
        return listToFilter.filter((element) =>
            element.name.toLowerCase().includes(filter.toLowerCase())
        );
    };

    return (
        <>
            {filterItems(arrayToFilter).map((person) => {
                return (
                    <SinglePerson
                        key={person.name}
                        person={person}
                        removeCallback={removeCallback}
                    ></SinglePerson>
                );
            })}
        </>
    );
};

export default Persons;
