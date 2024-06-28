import React from 'react';

interface CityInputProps {
  location: string;
  setLocation: (location: string) => void;
}

const CityInput: React.FC<CityInputProps> = ({ location, setLocation }) => {
  return (
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Enter city"
    />
  );
};

export default CityInput;
