import React from 'react';

import { useWeatherLocation } from '../hooks/useWeather';


type City = Record<string, string | number>;

const Location = () => {
    const { fetchWeather, loading, error, weatherData, locationData, fetchWeatherByCoords } = useWeatherLocation();
    const [cities, setCities] = React.useState<City[]>([]);
    const [searchCity, setSearchCity] = React.useState('');

    const handleSearch = () => {
        fetchWeather(searchCity);
        setSearchCity('');
    };

    const handleWeatherByCoords = (lat: number, lon: number) => {
        fetchWeatherByCoords(lat, lon);
    }

    const addCity = (newCity: City) => {
        const allCities = cities;

        if (allCities.length === 5) {
            allCities.splice(0, 1);
        }

        setCities([newCity, ...cities]);
    };

    React.useEffect(() => {

        if (weatherData) {
            addCity(weatherData);
        }

    }, [weatherData]);

    return <div>

        <input type='text' value={searchCity} onChange={(evt) => setSearchCity(evt.target.value)} />
        <button onClick={handleSearch}>Search</button>

        {
            loading ? <p>Loading...</p> : error.message ? <p>Error: {error.message}</p> : <p>Search for a new city</p>
        }
        <br />
        <br />
        <br />
        <div>
            <h3>Added Cities:</h3>
            <ul>
                {cities.map((c, index) => (
                    <li key={index} onClick={() => handleWeatherByCoords(c.lat as number, c.lon as number)}>{c.name}</li>
                ))}
            </ul>
        </div>

        <br />
        <br />
        <br />
        <div>
            {
                locationData !== null && (
                    <div>
                        <h3>Location Weather Data:</h3>
                        <p>City: {locationData.name}</p>
                        {
                            locationData?.main?.temp && (
                                <p>Temperature: {(locationData?.main?.temp - 273.15).toFixed(2)}°C</p>
                            )
                        }
                        {
                            locationData?.weather && locationData.weather.length > 0 && (
                                <p>Weather: {locationData.weather[0].description}</p>
                            )
                        }
                    </div>
                )
            }
        </div>

    </div>;
};

export default Location;
