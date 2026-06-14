import { useEffect, useState } from 'react';
import { readExcel } from '../utils/excelReader';

function SMMaster() {
  const [list, setList] = useState([]);
  const [states, setStates] = useState([]);

  const [smName, setSmName] = useState('');
  const [smCode, setSmCode] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [doj, setDoj] = useState('');
  const [lwd, setLwd] = useState('');
  const [status, setStatus] = useState('Active');

  const [search, setSearch] = useState('');

  // Load SM data
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem('smMaster')) || [];

    setList(saved);
  }, []);

  // Load State Master
  useEffect(() => {
    const savedStates =
      JSON.parse(localStorage.getItem('stateMaster')) || [];

    setStates(savedStates);
  }, []);

  // Save SM data
  useEffect(() => {
    localStorage.setItem(
      'smMaster',
      JSON.stringify(list)
    );
  }, [list]);

  const addItem = () => {
    if (
      !smName.trim() ||
      !smCode.trim() ||
      !stateCode
    ) {
      alert(
        'Please fill all mandatory fields.'
      );
      return;
    }

    const duplicate = list.some(
      (i) =>
        i.smCode.toLowerCase() ===
        smCode.toLowerCase()
    );

    if (duplicate) {
      alert('SM Code already exists');
      return;
    }

    setList([
      ...list,
      {
        id: Date.now(),
        smName: smName.trim(),
        smCode: smCode.trim(),
        stateCode,
        doj,
        lwd,
        status
      }
    ]);

    resetForm();
  };

  const resetForm = () => {
    setSmName('');
    setSmCode('');
    setStateCode('');
    setDoj('');
    setLwd('');
    setStatus('Active');
  };

  const deleteItem = (id) => {
    if (
      window.confirm(
        'Delete this SM record?'
      )
    ) {
      setList(
        list.filter((i) => i.id !== id)
      );
    }
  };

  const handleBulkUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    readExcel(file, (data) => {
      const newRecords = [];

      data.forEach((row) => {
        const code =
          row['SM Code'] ||
          row['smCode'];

        const name =
          row['SM Name'] ||
          row['smName'];

        const state =
          row['State Code'] ||
          row['stateCode'];

        if (!code || !name || !state)
          return;

        const exists =
          list.some(
            (i) =>
              i.smCode.toLowerCase() ===
              code
                .toString()
                .trim()
                .toLowerCase()
          ) ||
          newRecords.some(
            (i) =>
              i.smCode.toLowerCase() ===
              code
                .toString()
                .trim()
                .toLowerCase()
          );

        if (!exists) {
          newRecords.push({
            id:
              Date.now() +
              Math.random(),
            smName: name
              .toString()
              .trim(),
            smCode: code
              .toString()
              .trim(),
            stateCode: state
              .toString()
              .trim(),
            doj:
              row['DOJ'] || '',
            lwd:
              row['LWD'] || '',
            status:
              row['Status'] ||
              'Active'
          });
        }
      });

      if (newRecords.length === 0) {
        alert(
          'No new records found.'
        );
      } else {
        setList([
          ...list,
          ...newRecords
        ]);

        alert(
          `${newRecords.length} SM record(s) uploaded successfully.`
        );
      }
    });

    e.target.value = '';
  };

  const filteredList = list.filter(
    (i) =>
      i.smName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      i.smCode
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      i.stateCode
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>SM Master</h2>

      {/* Add SM */}
      <div className="card">
        <h3>Add SM</h3>

        <input
          placeholder="SM Name"
          value={smName}
          onChange={(e) =>
            setSmName(e.target.value)
          }
        />

        <input
          placeholder="SM Code"
          value={smCode}
          onChange={(e) =>
            setSmCode(e.target.value)
          }
        />

        <select
          value={stateCode}
          onChange={(e) =>
            setStateCode(
              e.target.value
            )
          }
        >
          <option value="">
            Select State
          </option>

          {states.map((s) => (
            <option
              key={s.id}
              value={s.stateCode}
            >
              {s.stateName} (
              {s.stateCode})
            </option>
          ))}
        </select>

        <label>DOJ</label>

        <input
          type="date"
          value={doj}
          onChange={(e) =>
            setDoj(e.target.value)
          }
        />

        <label>LWD</label>

        <input
          type="date"
          value={lwd}
          onChange={(e) =>
            setLwd(e.target.value)
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
        >
          <option>
            Active
          </option>

          <option>
            Inactive
          </option>
        </select>

        <button onClick={addItem}>
          Add SM
        </button>
      </div>

      {/* Bulk Upload */}
      <div className="card">
        <h3>
          Bulk Upload (Excel)
        </h3>

        <p>
          Required Columns:
          <br />
          SM Code
          <br />
          SM Name
          <br />
          State Code
          <br />
          DOJ
          <br />
          LWD
          <br />
          Status
        </p>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={
            handleBulkUpload
          }
        />
      </div>

      {/* Search */}
      <div className="card">
        <input
          placeholder="Search SM..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      {/* List */}
      <div className="card">
        <h3>SM List</h3>

        {filteredList.length ===
        0 ? (
          <p>
            No SM records found
          </p>
        ) : (
          filteredList.map((i) => (
            <div
              key={i.id}
              style={{
                marginBottom:
                  '10px'
              }}
            >
              <b>
                {i.smName}
              </b>{' '}
              ({i.smCode}) |
              State:{' '}
              {i.stateCode} |
              Status:{' '}
              {i.status}

              <button
                onClick={() =>
                  deleteItem(
                    i.id
                  )
                }
                style={{
                  marginLeft:
                    '10px'
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

export default SMMaster;