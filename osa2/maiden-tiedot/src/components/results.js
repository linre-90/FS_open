/**
 * Displays result listing of countries
 * @param {*} filteredData Results array
 * @returns
 */
const Results = ({ filteredData }) => {
    return (
        <div>
            {filteredData.map((element) => {
                return <p key={element.cca2}>{element.name.common}</p>;
            })}
        </div>
    );
};

export { Results };
