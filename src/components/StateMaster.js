import { useEffect, useState } from 'react';
import { readExcel } from '../utils/excelReader';

function StateMaster() {
  const [list, setList] = useState([]);
  const [stateName, setStateName] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [search, setSearch] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem('stateMaster')) || [];

    setList(saved);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem(
      'stateMaster',
      JSON.stringify(list)
    );
  }, [list]);

  const addItem = () => {
    if (!stateName.trim() || !stateCode.trim()) {
      alert('Please enter State Name and State Code');
      return;
    }

    const duplicate = list.some(
      (i) =>
        i.stateCode.toLowerCase() ===
        stateCode.toLowerCase()
    );

    if (duplicate) {
      alert('State Code already exists');
      return;
    }

    setList([
      ...list,
      {
        id: Date.now(),
        stateName: stateName.trim(),
        stateCode: stateCode.trim()
      }
    ]);

    setStateName('');
    setStateCode('');
  };

  const deleteItem = (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this state?'
      )
    ) {
      setList(list.filter((i) => i.id !== id));
    }
  };

  const handleBulkUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    readExcel(file, (data) => {
      const newStates = [];

      data.forEach((row) => {
        const code =
          row['State Code'] ||
          row['STATE CODE'] ||
          row['stateCode'];

        const name =
          row['State Name'] ||
          row['STATE NAME'] ||
          row['stateName'];

        if (!code || !name) return;

        const exists =
          list.some(
            (i) =>
              i.stateCode.toLowerCase() ===
              code.toString().trim().toLowerCase()
          ) ||
          newStates.some(
            (i) =>
              i.stateCode.toLowerCase() ===
              code.toString().trim().toLowerCase()
          );

        if (!exists) {
          newStates.push({
            id: Date.now() + Math.random(),
            stateCode: code.toString().trim(),
            stateName: name.toString().trim()
          });
        }
      });

      if (newStates.length === 0) {
        alert(
          'No new records found to upload.'
        );
      } else {
        setList([...list, ...newStates]);

        alert(
          `${newStates.length} state(s) uploaded successfully.`
        );
      }
    });

    e.target.value = '';
  };

  const filteredList = list.filter(
    (i) =>
      i.stateName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      i.stateCode
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>State Master</h2>

      {/* Add State */}
      <div className="card">
        <h3>Add State</h3>

        <input
          placeholder="State Name"
          value={stateName}
          onChange={(e) =>
            setStateName(e.target.value)
          }
        />

        <input
          placeholder="State Code"
          value={stateCode}
          onChange={(e) =>
            setStateCode(e.target.value)
          }
        />

        <button onClick={addItem}>
          Add State
        </button>
      </div>

      {/* Bulk Upload */}
      <div className="card">
        <h3>Bulk Upload (Excel)</h3>

        <p>
          Required columns:
          <br />
          <b>State Code</b>
          <br />
          <b>State Name</b>
        </p>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleBulkUpload}
        />
      </div>

      {/* Search */}
      <div className="card">
        <input
          placeholder="Search State..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* List */}
      <div className="card">
        <h3>State List</h3>

        {filteredList.length === 0 ? (
          <p>No states found</p>
        ) : (
          filteredList.map((i) => (
            <div
              key={i.id}
              style={{
                marginBottom: '10px'
              }}
            >
              {i.stateName} ({i.stateCode})

              <button
                onClick={() =>
                  deleteItem(i.id)
                }
                style={{
                  marginLeft: '10px'
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StateMaster;