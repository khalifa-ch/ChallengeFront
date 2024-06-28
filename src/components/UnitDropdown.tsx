import React from 'react';

interface UnitDropdownProps {
  unit: string;
  setUnit: (unit: string) => void;
}

const UnitDropdown: React.FC<UnitDropdownProps> = ({ unit, setUnit }) => {
  return (
    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
      <option value="metric">Metric</option>
      <option value="imperial">Imperial</option>
    </select>
  );
};

export default UnitDropdown;
