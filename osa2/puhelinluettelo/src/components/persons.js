/**
 * Displays single person
 * @param {*} person person object
 * @returns
 */
const SinglePerson = ({ person }) => {
    return (
        <>
            <p key={person.name}>
                {person.name} {person.number}
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
const Persons = ({ arrayToFilter, filter }) => {
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
                    ></SinglePerson>
                );
            })}
        </>
    );
};

export default Persons;
