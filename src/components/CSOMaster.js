import { useState } from 'react';
import { readExcel } from '../utils/excelReader';

function CSOMaster({ csos, setCsos }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [vendor, setVendor] = useState('');
  const [doj, setDoj] = useState('');
  const [lwd, setLwd] = useState('');

  // ADD CSO
  const addCSO = () => {
    if (!name || !code) return;

    const newCSO = {
      id: Date.now(),
      name,
      code,
      vendor,
      doj,
      lwd
    };

    setCsos([...csos, newCSO]);

    setName('');
    setCode('');
    setVendor('');
    setDoj('');
    setLwd('');
  };

  // DELETE CSO
  const deleteCSO = (id) => {
    setCsos(csos.filter((c) => c.id !== id));
  };

  // BULK UPLOAD
  const handleBulkUpload = (e) => {
    const file = e.target.files[0];

    readExcel(file, (data) => {
      const formatted = data.map((row) => ({
        id: Date.now() + Math.random(),
        name: row.name || '',
        code: row.code || '',
        vendor: row.vendor || '',
        doj: row.doj || '',
        lwd: row.lwd || ''
      }));

      setCsos([...csos, ...formatted]);
    });
  };

  return (
    <div>
      <h2>CSO Master</h2>

      {/* FORM */}
      <div className="card">
        <input
          placeholder="CSO Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          placeholder="Vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        />

        <input
          type="date"
          placeholder="DOJ"
          value={doj}
          onChange={(e) => setDoj(e.target.value)}
        />

        <input
          type="date"
          placeholder="LWD"
          value={lwd}
          onChange={(e) => setLwd(e.target.value)}
        />

        <button onClick={addCSO}>Add CSO</button>
      </div>

      {/* BULK UPLOAD */}
      <div className="card">
        <h3>Bulk Upload CSO</h3>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleBulkUpload}
        />

        <p>
          Columns: name, code, vendor, doj, lwd
        </p>
      </div>

      {/* LIST */}
      <div className="card">
        <h3>CSO List</h3>

        {csos.length === 0 ? (
          <p>No CSOs found</p>
        ) : (
          csos.map((c) => (
            <div key={c.id}>
              <b>{c.name}</b> ({c.code})
              <br />
              Vendor: {c.vendor}
              <br />
              DOJ: {c.doj || 'NA'}
              <br />
              LWD: {c.lwd || 'Active'}
              <br />

              <button onClick={() => deleteCSO(c.id)}>
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

export default CSOMaster;