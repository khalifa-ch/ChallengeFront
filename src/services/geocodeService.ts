import axios from "axios";

const GEOCODE_API_URL = "https://geocode.maps.co/search";

export interface GeocodeResult {
  lat: string;
  lon: string;
  display_name: string;
}

export const fetchCoordinates = async (
  city: string
): Promise<GeocodeResult[]> => {
  const response = await axios.get(GEOCODE_API_URL, {
    params: {
      q: city,
      api_key: import.meta.env.VITE_REACT_APP_GEOCODE_API_KEY,
    },
  });
  return response.data;
};
