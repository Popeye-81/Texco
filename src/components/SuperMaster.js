import { useState } from 'react';
import { readExcel } from '../utils/excelReader';

function SuperMaster({ supers, setSupers }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [region, setRegion] = useState('');

  // ADD SUPER
  const addSuper = () => {
    if (!name || !code) return;

    const newSuper = {
      id: Date.now(),
      name,
      code,
      region
    };

    setSupers([...supers, newSuper]);

    setName('');
    setCode('');
    setRegion('');
  };

  // DELETE SUPER
  const deleteSuper = (id) => {
    setSupers(supers.filter((s) => s.id !== id));
  };

  // BULK UPLOAD
  const handleBulkUpload = (e) => {
    const file = e.target.files[0];

    readExcel(file, (data) => {
      const formatted = data.map((row) => ({
        id: Date.now() + Math.random(),
        name: row.name || '',
        code: row.code || '',
        region: row.region || ''
      }));

      setSupers([...supers, ...formatted]);
    });
  };

  return (
    <div>
      <h2>Super Master</h2>

      {/* FORM */}
      <div className="card">
        <input
          placeholder="Super Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          placeholder="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />

        <button onClick={addSuper}>Add Super</button>
      </div>

      {/* BULK UPLOAD */}
      <div className="card">
        <h3>Bulk Upload</h3>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleBulkUpload}
        />

        <p>Columns: name, code, region</p>
      </div>

      {/* LIST */}
      <div className="card">
        <h3>Super List</h3>

        {supers.length === 0 ? (
          <p>No Super Masters found</p>
        ) : (
          supers.map((s) => (
            <div key={s.id}>
              <b>{s.name}</b> ({s.code}) - {s.region}

              <br />

              <button onClick={() => deleteSuper(s.id)}>
                Delete
              </button>

              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SuperMaster;