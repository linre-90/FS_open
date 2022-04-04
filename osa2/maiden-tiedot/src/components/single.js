/**
 * Display single country
 * @param {*} name country name
 * @param {*} capital country capital array
 * @param {*} area area of country
 * @param {*} languages languages object
 * @param {*} flag flag url
 * @returns
 */
const Single = ({ name, capital, area, languages, flag }) => {
    // get object property names
    const keys = Object.keys(languages);
    return (
        <div>
            <h3>{name}</h3>
            <p style={{ display: "inline-block" }}>capital</p>
            {capital.map((capital) => {
                return (
                    <p
                        style={{ display: "inline-block", marginLeft: "1ch" }}
                        key={capital}
                    >
                        {capital}
                    </p>
                );
            })}
            <p>area {area}</p>
            <h4>Languages:</h4>
            <ul>
                {keys.map((key) => {
                    return <li key={key}>{languages[key]}</li>;
                })}
            </ul>
            <img src={flag}></img>
        </div>
    );
};

export { Single };
