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
                    <>
                        <p key={element.cca2}>
                            {element.name.common}{" "}
                            <button
                                onClick={() => {
                                    showBtnCallback(element.name.common);
                                }}
                            >
                                show
                            </button>
                        </p>
                    </>
                );
            })}
        </div>
    );
};

export { Results };
