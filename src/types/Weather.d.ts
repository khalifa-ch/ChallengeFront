export interface WeatherData {
    current: {
      time: Date;
      temperature: number;
      weatherCode: number;
      windSpeed: number;
      windDirection: number;
    };
    hourly: {
      time: Date[];
      temperature: number[];
      precipitation: number[];
    };
    daily: {
      time: Date[];
      weatherCode: number[];
      temperatureMax: number[];
      temperatureMin: number[];
    };
  }
  