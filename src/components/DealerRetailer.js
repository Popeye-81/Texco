import { useState } from 'react';
import * as XLSX from 'xlsx';

function DealerRetailer() {
  const [role, setRole] = useState('CSO');

  const [csoCode, setCsoCode] = useState('');
  const [csoName, setCsoName] = useState('');
  const [vendor, setVendor] = useState('');

  const [joiningDate, setJoiningDate] = useState('');
  const [lwdDate, setLwdDate] = useState('');

  const [retailerName, setRetailerName] = useState('');
  const [city, setCity] = useState('');

  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);

  const [list, setList] = useState(() => {
    const saved = localStorage.getItem('texco_retailers');
    return saved ? JSON.parse(saved) : [];
  });

  // CSO mapping
  const csoMap = {
    C001: 'CSO - Rajesh',
    C002: 'CSO - Amit',
    S001: 'Sr CSO - Rahul',
    S002: 'Sr CSO - Sneha'
  };

  const handleCsoChange = (code) => {
    setCsoCode(code);
    setCsoName(csoMap[code] || '');
  };

  // ADD / UPDATE
  const handleAdd = () => {
    if (!csoCode || !retailerName) return;

    const newEntry = {
      id: editId || Date.now(),
      role,
      csoCode,
      csoName,
      vendor,
      joiningDate,
      lwdDate,
      retailerName,
      city
    };

    let updated;

    if (editId) {
      updated = list.map((item) =>
        item.id === editId ? newEntry : item
      );
      setEditId(null);
    } else {
      updated = [...list, newEntry];
    }

    setList(updated);
    localStorage.setItem('texco_retailers', JSON.stringify(updated));

    // reset form
    setCsoCode('');
    setCsoName('');
    setVendor('');
    setJoiningDate('');
    setLwdDate('');
    setRetailerName('');
    setCity('');
  };

  // DELETE
  const handleDelete = (id) => {
    const updated = list.filter((item) => item.id !== id);
    setList(updated);
    localStorage.setItem('texco_retailers', JSON.stringify(updated));
  };

  // EDIT
  const handleEdit = (item) => {
    setEditId(item.id);
    setRole(item.role);
    setCsoCode(item.csoCode);
    setCsoName(item.csoName);
    setVendor(item.vendor);
    setJoiningDate(item.joiningDate);
    setLwdDate(item.lwdDate);
    setRetailerName(item.retailerName);
    setCity(item.city);
  };

  // ✅ EXCEL BULK UPLOAD
  const handleBulkUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const newData = jsonData.map((row) => ({
        id: Date.now() + Math.random(),
        role: row.role || 'CSO',
        csoCode: row.csoCode,
        csoName: row.csoName,
        vendor: row.vendor,
        joiningDate: row.joiningDate,
        lwdDate: row.lwdDate,
        retailerName: row.retailerName,
        city: row.city
      }));

      const updated = [...list, ...newData];

      setList(updated);
      localStorage.setItem('texco_retailers', JSON.stringify(updated));
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>CSO / Sr CSO Retailer Management</h1>

      {/* ROLE */}
      <div className="card">
        <h3>Role</h3>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="CSO">CSO</option>
          <option value="SrCSO">Sr CSO</option>
        </select>
      </div>

      {/* CSO */}
      <div className="card">
        <h3>CSO Details</h3>

        <select value={csoCode} onChange={(e) => handleCsoChange(e.target.value)}>
          <option value="">Select CSO Code</option>
          <option value="C001">C001</option>
          <option value="C002">C002</option>
          <option value="S001">S001</option>
          <option value="S002">S002</option>
        </select>

        <p><b>{csoName}</b></p>
      </div>

      {/* EMPLOYMENT */}
      <div className="card">
        <h3>Employment Details</h3>

        <input
          placeholder="Vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        />

        <input
          type="date"
          value={joiningDate}
          onChange={(e) => setJoiningDate(e.target.value)}
        />

        <input
          type="date"
          value={lwdDate}
          onChange={(e) => setLwdDate(e.target.value)}
        />
      </div>

      {/* RETAILER FORM */}
      <div className="card">
        <h3>{editId ? 'Edit Retailer' : 'Add Retailer'}</h3>

        <input
          placeholder="Retailer Name"
          value={retailerName}
          onChange={(e) => setRetailerName(e.target.value)}
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={handleAdd}>
          {editId ? 'Update' : 'Add'}
        </button>
      </div>

      {/* BULK UPLOAD EXCEL */}
      <div className="card">
        <h3>Bulk Upload (Excel)</h3>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleBulkUpload}
        />

        <p style={{ fontSize: '12px', color: 'gray' }}>
          Columns: role, csoCode, csoName, vendor, joiningDate, lwdDate, retailerName, city
        </p>
      </div>

      {/* SEARCH */}
      <div className="card">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="card">
        {list
          .filter((item) =>
            item.retailerName?.toLowerCase().includes(search.toLowerCase()) ||
            item.csoName?.toLowerCase().includes(search.toLowerCase()) ||
            item.city?.toLowerCase().includes(search.toLowerCase()) ||
            item.vendor?.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <div key={item.id} style={{ marginBottom: '12px' }}>
              <b>{item.retailerName}</b> - {item.city}
              <br />

              CSO: {item.csoName} ({item.csoCode})
              <br />

              Vendor: {item.vendor}
              <br />

              Joining: {item.joiningDate}
              <br />

              LWD: {item.lwdDate}
              <br /><br />

              <button onClick={() => handleEdit(item)}>Edit</button>
              <button
                onClick={() => handleDelete(item.id)}
                style={{ marginLeft: '10px' }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DealerRetailer;