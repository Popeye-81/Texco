import { useEffect, useState } from 'react';
import { readExcel } from '../utils/excelReader';

function ASEMaster() {
  const [list, setList] = useState([]);
  const [asms, setAsms] = useState([]);

  const [aseName, setAseName] = useState('');
  const [aseCode, setAseCode] = useState('');
  const [asmCode, setAsmCode] = useState('');
  const [doj, setDoj] = useState('');
  const [lwd, setLwd] = useState('');
  const [status, setStatus] = useState('Active');

  const [search, setSearch] = useState('');

  // Load ASE data
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem('aseMaster')) || [];

    setList(saved);
  }, []);

  // Load ASM Master data
  useEffect(() => {
    const savedASMs =
      JSON.parse(localStorage.getItem('asmMaster')) || [];

    setAsms(savedASMs);
  }, []);

  // Save ASE data
  useEffect(() => {
    localStorage.setItem(
      'aseMaster',
      JSON.stringify(list)
    );
  }, [list]);

  const addItem = () => {
    if (
      !aseName.trim() ||
      !aseCode.trim() ||
      !asmCode
    ) {
      alert(
        'Please fill all mandatory fields.'
      );
      return;
    }

    const duplicate = list.some(
      (i) =>
        i.aseCode.toLowerCase() ===
        aseCode.toLowerCase()
    );

    if (duplicate) {
      alert('ASE Code already exists');
      return;
    }

    setList([
      ...list,
      {
        id: Date.now(),
        aseName: aseName.trim(),
        aseCode: aseCode.trim(),
        asmCode,
        doj,
        lwd,
        status
      }
    ]);

    resetForm();
  };

  const resetForm = () => {
    setAseName('');
    setAseCode('');
    setAsmCode('');
    setDoj('');
    setLwd('');
    setStatus('Active');
  };

  const deleteItem = (id) => {
    if (
      window.confirm(
        'Delete this ASE record?'
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
          row['ASE Code'] ||
          row['aseCode'];

        const name =
          row['ASE Name'] ||
          row['aseName'];

        const asm =
          row['ASM Code'] ||
          row['asmCode'];

        if (!code || !name || !asm)
          return;

        const exists =
          list.some(
            (i) =>
              i.aseCode.toLowerCase() ===
              code
                .toString()
                .trim()
                .toLowerCase()
          ) ||
          newRecords.some(
            (i) =>
              i.aseCode.toLowerCase() ===
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
            aseName: name
              .toString()
              .trim(),
            aseCode: code
              .toString()
              .trim(),
            asmCode: asm
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
          `${newRecords.length} ASE record(s) uploaded successfully.`
        );
      }
    });

    e.target.value = '';
  };

  const filteredList = list.filter(
    (i) =>
      i.aseName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      i.aseCode
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      i.asmCode
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>ASE Master</h2>

      <div className="card">
        <h3>Add ASE</h3>

        <input
          placeholder="ASE Name"
          value={aseName}
          onChange={(e) =>
            setAseName(e.target.value)
          }
        />

        <input
          placeholder="ASE Code"
          value={aseCode}
          onChange={(e) =>
            setAseCode(e.target.value)
          }
        />

        <select
          value={asmCode}
          onChange={(e) =>
            setAsmCode(e.target.value)
          }
        >
          <option value="">
            Select ASM
          </option>

          {asms.map((asm) => (
            <option
              key={asm.id}
              value={asm.asmCode}
            >
              {asm.asmName} (
              {asm.asmCode})
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
          Add ASE
        </button>
      </div>

      <div className="card">
        <h3>
          Bulk Upload (Excel)
        </h3>

        <p>
          Required Columns:
          <br />
          ASE Code
          <br />
          ASE Name
          <br />
          ASM Code
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

      <div className="card">
        <input
          placeholder="Search ASE..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      <div className="card">
        <h3>ASE List</h3>

        {filteredList.length ===
        0 ? (
          <p>
            No ASE records found
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
                {i.aseName}
              </b>{' '}
              ({i.aseCode}) |
              ASM:{' '}
              {i.asmCode} |
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

export default ASEMaster;