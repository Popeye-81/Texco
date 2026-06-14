import { useState } from 'react';

function Dashboard({
  supers = [],
  distributors = [],
  csos = [],
  retailers = [],
  mapping = []
}) {
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
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            <b>{s.name}</b> ({s.code})
          </div>
        ))
      )}

      {/* ---------------- DISTRIBUTORS ---------------- */}
      {selectedSuper && (
        <>
          <h3>Distributors</h3>

          {distributors.filter(
            (d) => d.superId === selectedSuper
          ).length === 0 ? (
            <p>No Distributors Found</p>
          ) : (
            distributors
              .filter((d) => d.superId === selectedSuper)
              .map((d) => (
                <div
                  key={d.id}
                  className="card"
                  onClick={() => setSelectedDistributor(d.id)}
                  style={{
                    cursor: 'pointer',
                    marginBottom: '10px'
                  }}
                >
                  {d.name} ({d.code})
                </div>
              ))
          )}
        </>
      )}

      {/* ---------------- CSO LEVEL ---------------- */}
      {selectedDistributor && (
        <>
          <h3>CSOs</h3>

          {csos.length === 0 ? (
            <p>No CSOs Found</p>
          ) : (
            csos.map((c) => (
              <div
                key={c.id}
                className="card"
                onClick={() => setSelectedCSO(c.id)}
                style={{
                  cursor: 'pointer',
                  marginBottom: '10px'
                }}
              >
                {c.name} ({c.code})
              </div>
            ))
          )}
        </>
      )}

      {/* ---------------- RETAILER LEVEL ---------------- */}
      {selectedCSO && (
        <>
          <h3>Retailers (Mapped)</h3>

          {mapping.filter(
            (m) => m.csoId === selectedCSO
          ).length === 0 ? (
            <p>No Retailers Mapped</p>
          ) : (
            mapping
              .filter((m) => m.csoId === selectedCSO)
              .map((m) => {
                const retailer = retailers.find(
                  (r) => r.id === m.retailerId
                );

                return (
                  <div
                    key={m.id}
                    className="card"
                    style={{ marginBottom: '10px' }}
                  >
                    {retailer
                      ? `${retailer.name} - ${retailer.city}`
                      : 'Retailer Not Found'}
                  </div>
                );
              })
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;