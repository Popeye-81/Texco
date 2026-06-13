import { useState } from 'react';
import * as XLSX from 'xlsx';

function DistributorMaster({ distributors, setDistributors, supers }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [region, setRegion] = useState('');
  const [vendor, setVendor] = useState('');
  const [superId, setSuperId] = useState('');

  // -----------------------------
  // ADD DISTRIBUTOR
  // -----------------------------
  const addDistributor = () => {
    if (!name || !code) return;

    const newDistributor = {
      id: Date.now(),
      name,
      code,
      region,
      vendor,
      superId
    };

    setDistributors([...distributors, newDistributor]);

    // reset form
    setName('');
    setCode('');
    setRegion('');
    setVendor('');
    setSuperId('');
  };

  // -----------------------------
  // DELETE DISTRIBUTOR
  // -----------------------------
  const deleteDistributor = (id) => {
    const updated = distributors.filter((d) => d.id !== id);
    setDistributors(updated);
  };

  // -----------------------------
  // BULK UPLOAD (EXCEL)
  // -----------------------------
  const handleBulkUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const formatted = jsonData.map((row) => ({
        id: Date.now() + Math.random(),
        name: row.name || '',
        code: row.code || '',
        region: row.region || '',
        vendor: row.vendor || '',
        superId: row.superId || ''
      }));

      setDistributors([...distributors, ...formatted]);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>Distributor Master</h2>

      {/* ---------------- FORM ---------------- */}
      <div className="card">
        <h3>Add Distributor</h3>

        <input
          placeholder="Distributor Name"
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

        <input
          placeholder="Vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        />

        {/* SUPER LINK */}
        <select
          value={superId}
          onChange={(e) => setSuperId(e.target.value)}
        >
          <option value="">Select Super Master</option>
          {supers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.code})
            </option>
          ))}
        </select>

        <button onClick={addDistributor}>
          Add Distributor
        </button>
      </div>

      {/* ---------------- BULK UPLOAD ---------------- */}
      <div className="card">
        <h3>Bulk Upload (Excel)</h3>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleBulkUpload}
        />

        <p style={{ fontSize: '12px', color: 'gray' }}>
          Excel columns: name, code, region, vendor, superId
        </p>
      </div>

      {/* ---------------- LIST ---------------- */}
      <div className="card">
        <h3>Distributor List</h3>

        {distributors.length === 0 ? (
          <p>No distributors found</p>
        ) : (
          distributors.map((d) => {
            const superName = supers.find(
              (s) => s.id === d.superId
            )?.name;

            return (
              <div
                key={d.id}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ddd'
                }}
              >
                <b>{d.name}</b> ({d.code})
                <br />
                Region: {d.region}
                <br />
                Vendor: {d.vendor}
                <br />
                Super: {superName || 'Not Assigned'}
                <br />

                <button
                  onClick={() => deleteDistributor(d.id)}
                  style={{ marginTop: '5px' }}
                >
                  Delete
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DistributorMaster;