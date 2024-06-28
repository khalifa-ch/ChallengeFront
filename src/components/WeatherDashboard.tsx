import React, { useState, useEffect } from "react";
import { fetchWeather } from "../services/weatherService";
import { fetchCoordinates, GeocodeResult } from "../services/geocodeService";
import { WeatherData } from "../types/Weather";
import CityInput from "./CityInput";
import WeatherCard from "./WeatherCard";
import ForecastTable from "./ForecastTable";
import DaysInput from "./DaysInput";
import styles from "../styles/WeatherDashboard.module.css";

const WeatherDashboard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>("Paris");
  const [latitude, setLatitude] = useState<number>(48.8566);
  const [longitude, setLongitude] = useState<number>(2.3522);
  const [unit, setUnit] = useState<string>("metric");
  const [days, setDays] = useState<number>(7);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCoordinatesAndWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching coordinates for:", location);
      const geocodeResults: GeocodeResult[] = await fetchCoordinates(location);
      console.log("Geocode Results:", geocodeResults);
      if (geocodeResults.length > 0) {
        const { lat, lon } = geocodeResults[0];
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lon));
        console.log("Fetching weather for coordinates:", lat, lon);

        const data = await fetchWeather(parseFloat(lat), parseFloat(lon),days);
        console.log("Weather Data:", data);
        setWeather(data);
      } else {
        setError("No coordinates found for the specified location.");
      }
    } catch (error) {
      setError("Error fetching coordinates or weather data.");
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoordinatesAndWeather();
  }, [location, days]);

  return (
    <div className={styles.dashboard}>
      <h1>Weather Dashboard</h1>
      <CityInput location={location} setLocation={setLocation} />
      <DaysInput days={days} setDays={setDays} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && <WeatherCard weather={weather.current} />}
      {weather && <ForecastTable forecast={weather.daily} />}
    </div>
  );
};

export default WeatherDashboard;
