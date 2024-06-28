import React from 'react';

interface DaysInputProps {
  days: number;
  setDays: (days: number) => void;
}

const DaysInput: React.FC<DaysInputProps> = ({ days, setDays }) => {
  return (
    <input
      type="number"
      value={days}
      onChange={(e) => setDays(Number(e.target.value))}
      min="1"
      max="7"
      placeholder="Days"
    />
  );
};

export default DaysInput;
