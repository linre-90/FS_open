/**
 * Search form component
 * @param {*} state controlled input field state
 * @param {*} stateCallback what to call when input changes?
 * @returns search react component
 */
const SearchForm = ({ state, stateCallback }) => {
    return (
        <form>
            <label>find countries </label>
            <input value={state} onChange={stateCallback}></input>
        </form>
    );
};

export { SearchForm };
