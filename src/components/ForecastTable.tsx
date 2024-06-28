import React from "react";
import styles from "../styles/ForecastTable.module.css";
import { WeatherData } from "../types/Weather";

interface ForecastTableProps {
  forecast: WeatherData["daily"];
}

const ForecastTable: React.FC<ForecastTableProps> = ({ forecast }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Weather Code</th>
          <th>Max Temp</th>
          <th>Min Temp</th>
        </tr>
      </thead>
      <tbody>
        {forecast.time.map((date, index) => (
          <tr key={index}>
            <td>{date.toISOString()}</td>
            <td>{forecast.weatherCode[index]}</td>
            <td>{forecast.temperatureMax[index]}°C</td>
            <td>{forecast.temperatureMin[index]}°C</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ForecastTable;
