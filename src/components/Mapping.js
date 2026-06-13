import { useState } from 'react';

function Mapping({ csos, retailers, mapping, setMapping }) {
  const [csoId, setCsoId] = useState('');
  const [retailerId, setRetailerId] = useState('');

  const map = () => {
    setMapping([
      ...mapping,
      { id: Date.now(), csoId, retailerId }
    ]);
  };

  return (
    <div>
      <h2>Mapping</h2>

      <select onChange={(e) => setCsoId(e.target.value)}>
        <option>Select CSO</option>
        {csos.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select onChange={(e) => setRetailerId(e.target.value)}>
        <option>Select Retailer</option>
        {retailers.map((r) => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>

      <button onClick={map}>Map</button>

      {mapping.map((m) => {
        const cso = csos.find(c => c.id === m.csoId);
        const retailer = retailers.find(r => r.id === m.retailerId);

        return (
          <div key={m.id}>
            {cso?.name} → {retailer?.name}
          </div>
        );
      })}
    </div>
  );
}

export default Mapping;