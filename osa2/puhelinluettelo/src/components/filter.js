/**
 * Component to gather filter. Controlled...
 * @param {*} filter where filter is saved
 * @param {*} changeFunction callback to perform
 * @returns filter react component
 */
const Filter = ({ filter, changeFunction }) => {
    return (
        <div>
            filter shown with
            <input value={filter} onChange={changeFunction} />
        </div>
    );
};

export default Filter;
