"use client";
import Link from "next/link"; // Import Link from Next.js
import useWeather from "./components/useWeather";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";

export default function Home() {
  const {
    weatherData,
    countryWeather,
    city,
    setCity,
    query,
    setQuery,
    handleSearch,
  } = useWeather(); // Use the hook

  // Initialize dark mode state with a fallback to `false`
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage after component mounts
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode); // Update state based on saved value
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode); // Save new dark mode state to localStorage
      return newMode;
    });
  };

  // Effect to apply the dark mode class when `isDarkMode` changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  return (
    <div className="min-h-screen bg-blue-200 text-gray-800 p-6 dark:bg-[#240C40] dark:text-white">
      <div className="max-w-6xl mx-auto bg-[#e1f1ec] rounded-lg  overflow-hidden dark:bg-[#1F2937] dark:text-white">
        {/* Header */}
        <div className="p-6 bg-blue-600 text-white dark:bg-[#1F3467] rounded-lg  flex justify-between items-center">
          <h1 className="text-3xl font-bold">Weather Forecast</h1>
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update query as user types
              placeholder="Enter city"
              className="p-2.5 text-gray-800 rounded-full bg-white shadow-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out placeholder:text-gray-500 dark:bg-[#1F2937] dark:text-white dark:placeholder-gray-300"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-800 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Search
            </button>
            <button
              type="button"
              className="p-2.5 bg-white text-blue-800 rounded-full shadow-lg hover:bg-gray-200 transition duration-200 ease-in-out"
              onClick={toggleDarkMode}
            >
              <FaMoon size={18} />
            </button>
          </form>
        </div>
        {/* Header section ended.................. */}

        {/* weather Display Section started */}
        {weatherData ? (
          <>
            {/* Weather Details */}
            <div className="flex space-x-6 p-6 ">
              <div className="w-1/3">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-gray-50">
                  {/* Current Weather */}
                  <div className="bg-gray-100 dark:bg-[#1F2937] p-6 rounded-lg text-center col-span-1 lg:col-span-3 shadow dark:shadow-none">

                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Current Weather</h2>

                    {/* Location Details */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-50">
                        {weatherData.city.name}, {weatherData.city.country}
                      </h3>
                    </div>

                    {/* Weather Icon */}
                    <div className="flex justify-center mb-4">
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`}
                        alt={weatherData.list[0].weather[0].description}
                        className="w-24 h-24"
                      />
                    </div>

                    {/* Temperature & Feels Like */}
                    <p className="text-4xl font-bold text-blue-600 dark:text-gray-50">
                      {Math.round(weatherData.list[0].main.temp)}°C
                    </p>
                    <p className="text-gray-600 text-lg dark:text-gray-50">
                      Feels like{" "}
                      {Math.round(weatherData.list[0].main.feels_like)}°C
                    </p>

                    {/* Day */}
                    <p className="mt-4 text-gray-500 text-lg font-medium dark:text-gray-50">
                      {new Date(
                        weatherData.list[0].dt * 1000
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </p>

                    {/* Rain Type & Possibility */}
                    <p className="mt-4 text-gray-500 text-lg font-medium dark:text-gray-50">
                      {weatherData.list[0].weather[0].main === "Rain"
                        ? weatherData.list[0].rain &&
                          weatherData.list[0].rain["3h"] > 5
                          ? "Heavy Rain"
                          : "Light Rain"
                        : "No Rain"}{" "}
                      ({Math.round(weatherData.list[0].pop * 100)}% chance)
                    </p>

                    {/* Animated Weather Icons */}
                    <div className="icon-container mb-2">
                      <div
                        className="icon-slide"
                        style={{ animationDelay: "5s" }}
                      >
                        {/* Sun Icon */}
                        <div className="text-center inline-block mx-6">
                          <i className="fas fa-sun"></i>
                        </div>
                      </div>

                      <div
                        className="icon-slide"
                        style={{ animationDelay: "2s" }}
                      >
                        {/* Moon Icon */}
                        <div className="text-center inline-block mx-6">
                          <i className="fas fa-moon"></i>
                        </div>
                      </div>

                      <div
                        className="icon-slide"
                        style={{ animationDelay: "4s" }}
                      >
                        {/* Rainy Weather Icon */}
                        <div className="text-center inline-block mx-6">
                          <i className="fas fa-cloud-showers-heavy"></i>
                        </div>

                        <div
                          className="icon-slide"
                          style={{ animationDelay: "4s" }}
                        >
                          {/* Full Moon Icon */}
                          <div className="text-center inline-block mx-6">
                            <i className="fas fa-circle"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Animated Weather Icons ended */}
                  </div>
                </div>
              </div>
              {/* Weather Details section ended.................. */}

              {/* Today's Highlights section Started */}
              <div className="w-2/3 ">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md dark:bg-[#1E3469] dark:text-white"> 
                  <h2 className="text-xl font-bold mb-4 ">
                    Today's Highlights
                  </h2>
                  {weatherData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
                      {/* Pressure */}
                      <div className="bg-white p-4 rounded-lg shadow text-center dark:bg-[#1F2937] dark:text-white">
                        <h3 className="font-semibold text-gray-600 dark:text-white">
                          Pressure
                        </h3>
                        <p className="text-sm dark:text-white">
                          {weatherData.list[0].main.pressure} hPa
                        </p>
                      </div>

                      {/* Visibility */}
                      <div className="bg-white p-4 rounded-lg shadow text-center dark:bg-[#1F2937] dark:text-white">
                        <h3 className="font-semibold text-gray-600 dark:text-white">
                          Visibility
                        </h3>
                        <p className="text-sm  dark:text-white">
                          {weatherData.list[0].visibility / 1000} km
                        </p>
                        <p className="text-sm  text-gray-500 dark:text-white">
                          {weatherData.list[0].visibility / 1000 < 1
                            ? "Critical"
                            : weatherData.list[0].visibility / 1000 < 5
                            ? "Foggy"
                            : "Normal"}
                        </p>
                      </div>

                      {/* Humidity */}
                      <div className="bg-white p-4 rounded-lg shadow text-center dark:bg-[#1F2937] dark:text-white">
                        <h3 className="font-semibold text-gray-600 dark:text-white">
                          Humidity
                        </h3>
                        <p className="text-sm  dark:text-white">
                          {weatherData.list[0].main.humidity}%
                        </p>
                        <p className="text-sm  text-gray-500 dark:text-white">
                          {weatherData.list[0].main.humidity > 70
                            ? "Hydrated"
                            : "Dehydrated"}
                        </p>
                      </div>

                      {/* Wind Status */}
                      <div className="bg-white p-4 rounded-lg shadow text-center dark:bg-[#1F2937] dark:text-white">
                        <h3 className="font-semibold text-gray-600 dark:text-white">
                          Wind Status
                        </h3>
                        <p className="text-sm  dark:text-white">
                          {weatherData.list[0].wind.speed} m/s
                        </p>
                        <p className="text-sm  text-gray-500 dark:text-white">
                          Direction: {weatherData.list[0].wind.deg}°
                        </p>
                      </div>

                      {/* Temperature Min/Max */}
                      <div className="bg-white p-4 rounded-lg shadow text-center dark:bg-[#1F2937] dark:text-white">
                        <h3 className="font-semibold text-gray-600 dark:text-white">
                          Temperature
                        </h3>
                        <p className="text-sm  text-gray-500 dark:text-white">
                          Min: {Math.round(weatherData.list[0].main.temp_min)}°C
                          <br />
                          Max: {Math.round(weatherData.list[0].main.temp_max)}°C
                        </p>
                      </div>

                      {/* Sunrise & Sunset */}
                      <div className="bg-white p-4 rounded-lg shadow text-center dark:bg-[#1F2937] dark:text-white">
                        <h3 className="font-semibold text-gray-600 dark:text-white">
                          Rise & Set
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-white">
                          Sunrise:{" "}
                          {new Date(
                            weatherData.city.sunrise * 1000
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-sm  text-gray-500 dark:text-white">
                          Sunset:{" "}
                          {new Date(
                            weatherData.city.sunset * 1000
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Today's Highlights section ended.................. */}
                  {/* Hourly Forecast section started */}
                  <div className=" bg-blue-100 mt-5 dark:bg-[#1E3469] dark:text-white">
                    <h2 className="text-xl font-bold mb-4">Hourly Forecast</h2>
                    <div className="flex space-x-4 overflow-x-auto ">
                      {weatherData.list.slice(0, 5).map((hour, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-4 rounded-lg shadow-md text-center w-64 dark:bg-[#1F2937] dark:text-white"
                        >
                          <p>
                            {new Date(hour.dt * 1000).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <img
                            src={`https://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
                            alt="icon"
                            className="w-8 h-8 mx-auto my-2"
                          />
                          <p>{Math.round(hour.main.temp)}°C</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Hourly Forecast section ended */}
                </div>
              </div>
            </div>

            {/* Main Wrapper for both sections */}
            <div className="flex space-x-6 p-6 dark:bg-[#1E3469] dark:text-white">
              {/* 5-Day Forecast started */}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  5-Day Forecast
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
                  {weatherData.list
                    .filter((_, idx) => idx % 8 === 0)
                    .map((day, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 dark:bg-[#1F2937] dark:text-white p-6 rounded-lg shadow-xl text-center transition-transform transform hover:scale-105 "
                      >
                        <p className="font-semibold text-lg ">
                          {new Date(day.dt * 1000).toLocaleDateString([], {
                            weekday: "short",
                          })}
                        </p>
                        <img
                          src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                          alt="icon"
                          className="w-14 h-14 mx-auto my-4"
                        />
                        <p className="text-3xl font-semibold">
                          {Math.round(day.main.temp)}°C
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              {/* 5-Day Forecast ended */}
              <div className=" border-l-4 border-pink-700"></div>

              {/* Other Country Weather started */}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Weather in Other Countries
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {countryWeather.map((country, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#1F2937] dark:text-white h-[202px]  p-6 rounded-lg shadow-xl text-center transition-transform transform hover:scale-105"
                    >
                      <h3 className="font-semibold text-xl">{country.name}</h3>
                      <img
                        src={`https://openweathermap.org/img/w/${country.weather[0].icon}.png`}
                        alt={country.weather[0].description}
                        className="w-14 h-14 mx-auto my-4"
                      />
                      <p className="text-3xl font-semibold dark:text-white">
                        {Math.round(country.main.temp)}°C
                      </p>
                      <p className="text-gray-500 text-sm dark:text-gray-300">
                        {country.weather[0].description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Other Country Weather ended */}
            </div>
          </>
        ) : (
          <p className="text-center p-6">Loading...</p>
        )}

        {/* 5-Day Forecast ended */}

        {/* Other Country Weather ended */}
      </div>
    </div>
  );
}
