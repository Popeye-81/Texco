import { useState } from 'react';

function RetailerMaster({ retailers, setRetailers }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const add = () => {
    setRetailers([
      ...retailers,
      { id: Date.now(), name, city }
    ]);
  };

  return (
    <div>
      <h2>Retailer Master</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="City" onChange={(e) => setCity(e.target.value)} />

      <button onClick={add}>Add</button>

      {retailers.map((r) => (
        <div key={r.id}>{r.name} - {r.city}</div>
      ))}
    </div>
  );
}

export default RetailerMaster;