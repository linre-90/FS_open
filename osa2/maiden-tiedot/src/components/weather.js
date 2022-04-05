/**
 * Component renders weather
 * @param {*} weather weather data array
 * @returns
 */
const Weather = ({ weather }) => {
    if (weather === null) {
        return <></>;
    } else {
        return (
            <>
                <p>temperature {weather.main.temp} Celcius</p>
                <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                ></img>
                <p>wind {weather.wind.speed} m/s</p>
            </>
        );
    }
};

export { Weather };
