import { useState } from 'react';

function Dashboard({ supers, distributors, csos, retailers, mapping }) {
  const [selectedSuper, setSelectedSuper] = useState(null);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [selectedCSO, setSelectedCSO] = useState(null);

  return (
    <div>
      <h2>ERP Hierarchy Dashboard</h2>

      {/* ---------------- SUPER LEVEL ---------------- */}
      <h3>Super Masters</h3>

      {supers.length === 0 ? (
        <p>No Super Masters</p>
      ) : (
        supers.map((s) => (
          <div
            key={s.id}
            className="card"
            onClick={() => {
              setSelectedSuper(s.id);
              setSelectedDistributor(null);
              setSelectedCSO(null);
            }}
            style={{ cursor: 'pointer' }}
          >
            <b>{s.name}</b> ({s.code})
          </div>
        ))
      )}

      {/* ---------------- DISTRIBUTORS ---------------- */}
      {selectedSuper && (
        <>
          <h3>Distributors</h3>

          {distributors
            .filter((d) => d.superId === selectedSuper)
            .map((d) => (
              <div
                key={d.id}
                className="card"
                onClick={() => setSelectedDistributor(d.id)}
                style={{ cursor: 'pointer' }}
              >
                {d.name} ({d.code})
              </div>
            ))}
        </>
      )}

      {/* ---------------- CSO LEVEL ---------------- */}
      {selectedDistributor && (
        <>
          <h3>CSOs</h3>

          {csos.map((c) => (
            <div
              key={c.id}
              className="card"
              onClick={() => setSelectedCSO(c.id)}
              style={{ cursor: 'pointer' }}
            >
              {c.name} ({c.code})
            </div>
          ))}
        </>
      )}

      {/* ---------------- RETAILER LEVEL ---------------- */}
      {selectedCSO && (
        <>
          <h3>Retailers (Mapped)</h3>

          {mapping
            .filter((m) => m.csoId === selectedCSO)
            .map((m) => {
              const retailer = retailers.find(
                (r) => r.id === m.retailerId
              );

              return (
                <div key={m.id} className="card">
                  {retailer?.name} - {retailer?.city}
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}

export default Dashboard;