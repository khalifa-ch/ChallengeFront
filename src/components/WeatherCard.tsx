import React from 'react';
import styles from '../styles/WeatherCard.module.css';
import { WeatherData } from '../types/Weather';

interface WeatherCardProps {
  weather: WeatherData['current'];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className={styles.card}>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Weather Code: {weather.weatherCode}</p>
      <p>Wind Speed: {weather.windSpeed} m/s</p>
      <p>Wind Direction: {weather.windDirection}°</p>
    </div>
  );
};

export default WeatherCard;
