import { useState, useEffect } from "react";
import axios from "axios";

import { SearchForm } from "./components/searchForm";
import { Results } from "./components/results";
import { Single } from "./components/single";

const App = () => {
    // search field state
    const [initialData, setInitialdata] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    // search callback
    const searchCallback = (event) => {
        setSearch(event.target.value);
        setFilteredData(filterData(event.target.value));
    };

    // get initial state
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            setInitialdata(response.data);
            setLoading(false);
        });
    }, []);

    //function to filter countries by name
    const filterData = (filter) => {
        if (initialData !== null) {
            let returnArray = initialData.filter((element) =>
                element.name.common.toLowerCase().includes(filter.toLowerCase())
            );
            if (returnArray) {
                return returnArray;
            } else {
                return [];
            }
        } else {
            return [];
        }
    };

    return (
        <div>
            {!loading ? (
                <SearchForm
                    state={search}
                    stateCallback={searchCallback}
                ></SearchForm>
            ) : (
                <p>loading data</p>
            )}

            {filteredData.length > 10 || filteredData.length < 1 ? (
                <p>Too many matches, specify another filter</p>
            ) : filteredData.length === 1 ? (
                <Single
                    name={filteredData[0].name.common}
                    area={filteredData[0].area}
                    languages={filteredData[0].languages}
                    capital={filteredData[0].capital}
                    flag={filteredData[0].flags.png}
                ></Single>
            ) : (
                <Results filteredData={filteredData}></Results>
            )}
        </div>
    );
};

export default App;
