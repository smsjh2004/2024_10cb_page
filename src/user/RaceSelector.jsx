import React from 'react';
import { Form } from 'react-bootstrap';

const RaceSelector = ({ selectedRace, onSelectRace, excludeRaces, disabled }) => {
  const races = ['프로토스', '저그', '테란']; // 가능한 레이스 목록

  const handleSelect = (e) => {
    const selected = e.target.value;
    onSelectRace(selected);
  };

  return (
    <Form.Control as="select" value={selectedRace} onChange={handleSelect} disabled={disabled}>
      {!selectedRace && <option value="" disabled>
        종족을 선택해주세요
      </option>}
      {races.map((race) => (
        <option key={race} value={race} disabled={excludeRaces.includes(race) && !disabled}>
          {race}
        </option>
      ))}
    </Form.Control>
  );
};

export default RaceSelector;
