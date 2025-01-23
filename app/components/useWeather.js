// hooks/useWeather.js
import { useState, useEffect } from "react";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [countryWeather, setCountryWeather] = useState([]);
  const [city, setCity] = useState("Dhaka");
  const [query, setQuery] = useState("");
  
  // Use the environment variable for the API key
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const countries = ["Dhaka", "New York", "Tokyo", "London", "Sydney", "Paris"];

  // Fetch weather data based on the city
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  // Fetch weather data for other countries
  useEffect(() => {
    const fetchCountryWeather = async () => {
      try {
        const weatherPromises = countries.map(async (country) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`
          );
          return response.json();
        });
        const weatherResults = await Promise.all(weatherPromises);
        setCountryWeather(weatherResults);
      } catch (error) {
        console.error("Error fetching country weather data:", error);
      }
    };

    fetchCountryWeather();
  }, [apiKey]);

  // Handle the search input and update the city
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      setCity(query); // Update city when search is performed
      setQuery(""); // Reset query field
    }
  };

  return {
    weatherData,
    countryWeather,
    city,
    setCity,
    query,
    setQuery,
    handleSearch
  };
};

export default useWeather;
