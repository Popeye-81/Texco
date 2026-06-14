import { useEffect, useState } from 'react';
import { readExcel } from '../utils/excelReader';

function ASMMaster() {
  const [list, setList] = useState([]);
  const [sms, setSms] = useState([]);

  const [asmName, setAsmName] = useState('');
  const [asmCode, setAsmCode] = useState('');
  const [smCode, setSmCode] = useState('');
  const [doj, setDoj] = useState('');
  const [lwd, setLwd] = useState('');
  const [status, setStatus] = useState('Active');

  const [search, setSearch] = useState('');

  // Load ASM data
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem('asmMaster')) || [];

    setList(saved);
  }, []);

  // Load SM Master data
  useEffect(() => {
    const savedSMs =
      JSON.parse(localStorage.getItem('smMaster')) || [];

    setSms(savedSMs);
  }, []);

  // Save ASM data
  useEffect(() => {
    localStorage.setItem(
      'asmMaster',
      JSON.stringify(list)
    );
  }, [list]);

  const addItem = () => {
    if (
      !asmName.trim() ||
      !asmCode.trim() ||
      !smCode
    ) {
      alert('Please fill all mandatory fields.');
      return;
    }

    const duplicate = list.some(
      (i) =>
        i.asmCode.toLowerCase() ===
        asmCode.toLowerCase()
    );

    if (duplicate) {
      alert('ASM Code already exists');
      return;
    }

    setList([
      ...list,
      {
        id: Date.now(),
        asmName: asmName.trim(),
        asmCode: asmCode.trim(),
        smCode,
        doj,
        lwd,
        status
      }
    ]);

    resetForm();
  };

  const resetForm = () => {
    setAsmName('');
    setAsmCode('');
    setSmCode('');
    setDoj('');
    setLwd('');
    setStatus('Active');
  };

  const deleteItem = (id) => {
    if (
      window.confirm(
        'Delete this ASM record?'
      )
    ) {
      setList(list.filter((i) => i.id !== id));
    }
  };

  const handleBulkUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    readExcel(file, (data) => {
      const newRecords = [];

      data.forEach((row) => {
        const code =
          row['ASM Code'] ||
          row['asmCode'];

        const name =
          row['ASM Name'] ||
          row['asmName'];

        const sm =
          row['SM Code'] ||
          row['smCode'];

        if (!code || !name || !sm)
          return;

        const exists =
          list.some(
            (i) =>
              i.asmCode.toLowerCase() ===
              code
                .toString()
                .trim()
                .toLowerCase()
          ) ||
          newRecords.some(
            (i) =>
              i.asmCode.toLowerCase() ===
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
            asmName: name
              .toString()
              .trim(),
            asmCode: code
              .toString()
              .trim(),
            smCode: sm
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
        alert('No new records found.');
      } else {
        setList([
          ...list,
          ...newRecords
        ]);

        alert(
          `${newRecords.length} ASM record(s) uploaded successfully.`
        );
      }
    });

    e.target.value = '';
  };

  const filteredList = list.filter(
    (i) =>
      i.asmName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      i.asmCode
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      i.smCode
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>ASM Master</h2>

      <div className="card">
        <h3>Add ASM</h3>

        <input
          placeholder="ASM Name"
          value={asmName}
          onChange={(e) =>
            setAsmName(e.target.value)
          }
        />

        <input
          placeholder="ASM Code"
          value={asmCode}
          onChange={(e) =>
            setAsmCode(e.target.value)
          }
        />

        <select
          value={smCode}
          onChange={(e) =>
            setSmCode(e.target.value)
          }
        >
          <option value="">
            Select SM
          </option>

          {sms.map((sm) => (
            <option
              key={sm.id}
              value={sm.smCode}
            >
              {sm.smName} ({sm.smCode})
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
            setStatus(e.target.value)
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
          Add ASM
        </button>
      </div>

      <div className="card">
        <h3>Bulk Upload (Excel)</h3>

        <p>
          Required Columns:
          <br />
          ASM Code
          <br />
          ASM Name
          <br />
          SM Code
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
          onChange={handleBulkUpload}
        />
      </div>

      <div className="card">
        <input
          placeholder="Search ASM..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="card">
        <h3>ASM List</h3>

        {filteredList.length === 0 ? (
          <p>No ASM records found</p>
        ) : (
          filteredList.map((i) => (
            <div
              key={i.id}
              style={{
                marginBottom: '10px'
              }}
            >
              <b>{i.asmName}</b> (
              {i.asmCode}) |
              SM: {i.smCode} |
              Status: {i.status}

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

export default ASMMaster;