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

        setCities([...cities, newCity]);
    };

    React.useEffect(() => {

        if (weatherData) {
            addCity(weatherData);
        }

    }, [weatherData]);

    return <div>

        <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" type='text' value={searchCity} onChange={(evt) => setSearchCity(evt.target.value)} />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow" type="button" onClick={handleSearch}>Search</button>

        {
            loading ? <p>Loading...</p> : error.message ? <p>Error: {error.message}</p> : <p>Search for a new city</p>
        }
        <br />
        <br />
        <br />
        <div>
            <h3>Added Cities:</h3>
            <ul className='list-none p-0'>
                {cities.map((c, index) => (
                    <li className='cursor-pointer' key={index} onClick={() => handleWeatherByCoords(c.lat as number, c.lon as number)}>{c.name}</li>
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
