import { useState, useEffect } from "react";

const APP_ID = process.env.REACT_APP_OPEN_WEATHER_APP_ID;

// Add weather type
type Weather = any;

const useWeatherLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "" });
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState<Weather>({});

  const fetchWeather = async (city: string) => {
    if (!city.trim()) return;

    const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APP_ID}`;
    try {
      setLoading(true);
      const response = await fetch(URL);
      const data = await response.json();
      if (!response.ok) {
        setError({
          ...data,
          message: data.message || "Failed to fetch weather data",
        });
      }
      const cityData = data[0];
      setWeatherData(cityData);
      setLoading(false);
    } catch (error) {
      setError({
        message: "Failed to fetch weather data",
      });
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=7&appid=${APP_ID}`;

    try {
      const result = await fetch(URL);
      const data = await result.json();
      if (!result.ok) {
        setError({
          ...data,
          message: data.message || "Failed to fetch weather data",
        });
      }
      const cityData = data;
      setLocationData(cityData);
    } catch (error) {
      setError({
        message: "Failed to fetch weather data",
      });
      console.error("Error fetching weather data:", error);
    }
  };

  return {
    loading,
    error,
    weatherData,
    fetchWeather,
    fetchWeatherByCoords,
    locationData,
  };
};

export { useWeatherLocation };
