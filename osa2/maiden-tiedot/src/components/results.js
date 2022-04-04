/**
 * Displays result listing of countries
 * @param {*} filteredData Results array
 * @returns
 */
const Results = ({ filteredData, showBtnCallback }) => {
    return (
        <div>
            {filteredData.map((element) => {
                return (
                    <span key={element.cca2}>
                        <p>
                            {element.name.common}{" "}
                            <button
                                onClick={() => {
                                    showBtnCallback(element.name.common);
                                }}
                            >
                                show
                            </button>
                        </p>
                    </span>
                );
            })}
        </div>
    );
};

export { Results };
