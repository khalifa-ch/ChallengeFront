import { fetchWeatherApi } from "openmeteo";
import { WeatherData } from "../types/Weather";

const API_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeather = async (
  latitude: number,
  longitude: number,
  days:number
): Promise<WeatherData> => {
  const params = {
    latitude: [latitude],
    longitude: [longitude],
    current: "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m",
    hourly: "temperature_2m,precipitation",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
  };
  const responses = await fetchWeatherApi(API_URL, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const weatherData: WeatherData = {
    current: {
      time: new Date(
        (Number(response.current().time()) + utcOffsetSeconds) * 1000
      ),
      temperature: response.current().variables(0).value(),
      weatherCode: response.current().variables(1).value(),
      windSpeed: response.current().variables(2).value(),
      windDirection: response.current().variables(3).value(),
    },
    hourly: {
      time: range(
        Number(response.hourly().time()),
        Number(response.hourly().timeEnd()),
        response.hourly().interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature: response.hourly().variables(0).valuesArray(),
      precipitation: response.hourly().variables(1).valuesArray(),
    },
    daily: {
      time: range(
        Number(response.daily().time()),
        Number(response.daily().timeEnd()),
        response.daily().interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: response.daily().variables(0).valuesArray(),
      temperatureMax: response.daily().variables(1).valuesArray(),
      temperatureMin: response.daily().variables(2).valuesArray(),
    },
  };
  weatherData.daily.time = weatherData.daily.time.slice(0, days);
  weatherData.daily.weatherCode = weatherData.daily.weatherCode.slice(0, days);
  weatherData.daily.temperatureMax = weatherData.daily.temperatureMax.slice(0, days);
  weatherData.daily.temperatureMin = weatherData.daily.temperatureMin.slice(0, days);

  return weatherData;
};

const range = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
