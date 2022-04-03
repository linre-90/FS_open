/**
 *
 * @param {*} formSubmit action when form is submitted
 * @param {*} nameValue controlled input state
 * @param {*} numberValue controlled input state
 * @param {*} nameChangeHandler callback to handle name value change
 * @param {*} numberChangeHandler callback to handle number value change
 * @returns
 */
const PersonForm = ({
    formSubmit,
    nameValue,
    numberValue,
    nameChangeHandler,
    numberChangeHandler,
}) => {
    return (
        <form onSubmit={formSubmit}>
            <div>
                name:
                <input value={nameValue} onChange={nameChangeHandler} />
                <br></br>
                number:
                <input value={numberValue} onChange={numberChangeHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
