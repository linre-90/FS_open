import { useState, useEffect } from "react";
import axios from "axios";

import { SearchForm } from "./components/searchForm";
import { Results } from "./components/results";
import { Single } from "./components/single";
import { Weather } from "./components/weather";

const App = () => {
    // search field state
    const [initialData, setInitialdata] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState(null);

    // search callback
    const searchCallback = (event) => {
        setSearch(event.target.value);
        setFilteredData(filterData(event.target.value));
    };

    // show button functionality
    const showButtonAction = (country) => {
        setSearch(country);
        setFilteredData(filterData(country));
    };

    // get initial state
    useEffect(() => {
        // "https://restcountries.com/v3.1/all" triggered
        // random "::ERR_CERT_DATE_INVALID" errors.
        // Did get that on chrome and firefox addresbar too.
        // Certificate seems to expire 5.4.2022
        axios
            .get("https://restcountries.com/v3.1/all") // random "::ERR_CERT_DATE_INVALID" errors. Did get that on chrome and firefox addresbar too. Certificate seems to expire 5.4.2022
            .then((response) => {
                setInitialdata(response.data);
                setLoading(false);
            });
    }, []);

    //get weather state when filteredData contains only 1 country and weather is null or different country name than current filteredData[0]
    useEffect(() => {
        if (filteredData.length === 1) {
            if (
                // prevent extra requests
                weather === null ||
                filteredData[0].name.common.toLowerCase() !==
                    weather.name.toLowerCase()
            ) {
                axios
                    .get(
                        `http://api.openweathermap.org/data/2.5/weather?q=${filteredData[0].name.common}&appid=${process.env.REACT_APP_FULL_STACK_WEATHER_API_KEY}&units=metric`
                    )
                    .then((response) => {
                        setWeather(response.data);
                    });
            }
        }
        // No need to call this hook when weather changes.
        // It also should cause infinitive loop without if statement above?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredData]);

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
        <>
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
                <>
                    <Single
                        name={filteredData[0].name.common}
                        area={filteredData[0].area}
                        languages={filteredData[0].languages}
                        capital={filteredData[0].capital}
                        flag={filteredData[0].flags.png}
                    ></Single>

                    <h2>Weather in {filteredData[0].name.common}</h2>
                    <Weather weather={weather}></Weather>
                </>
            ) : (
                <Results
                    filteredData={filteredData}
                    showBtnCallback={showButtonAction}
                ></Results>
            )}
        </>
    );
};

export default App;
