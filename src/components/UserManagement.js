import { useState, useEffect } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [role, setRole] = useState('');
  const [vendor, setVendor] = useState('');
  const [doj, setDoj] = useState('');
  const [lwd, setLwd] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(
      localStorage.getItem('texcoUsers')
    ) || [];

    // Create default admin
    if (storedUsers.length === 0) {
      const admin = {
        employeeCode: 'admin',
        employeeName: 'Administrator',
        username: 'admin',
        password: 'admin123',
        role: 'Admin',
        vendor: '',
        doj: '',
        lwd: '',
        status: 'Active'
      };

      localStorage.setItem(
        'texcoUsers',
        JSON.stringify([admin])
      );

      setUsers([admin]);
    } else {
      setUsers(storedUsers);
    }
  }, []);

  const handleAddUser = () => {
    if (
      !employeeCode ||
      !employeeName ||
      !role ||
      !doj
    ) {
      alert('Please fill all mandatory fields');
      return;
    }

    const exists = users.some(
      (user) =>
        user.employeeCode.toLowerCase() ===
        employeeCode.toLowerCase()
    );

    if (exists) {
      alert('Employee Code already exists');
      return;
    }

    const newUser = {
      employeeCode,
      employeeName,
      username: employeeCode,
      password: employeeCode,
      role,
      vendor:
        role === 'CSO' || role === 'Sr. CSO'
          ? vendor
          : '',
      doj,
      lwd,
      status: 'Active'
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    localStorage.setItem(
      'texcoUsers',
      JSON.stringify(updatedUsers)
    );

    setEmployeeCode('');
    setEmployeeName('');
    setRole('');
    setVendor('');
    setDoj('');
    setLwd('');

    alert('User added successfully');
  };

  const toggleStatus = (employeeCode) => {
    const updatedUsers = users.map((user) => {
      if (
        user.employeeCode === employeeCode &&
        user.role !== 'Admin'
      ) {
        return {
          ...user,
          status:
            user.status === 'Active'
              ? 'Inactive'
              : 'Active'
        };
      }

      return user;
    });

    setUsers(updatedUsers);

    localStorage.setItem(
      'texcoUsers',
      JSON.stringify(updatedUsers)
    );
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>User Management</h1>

      <div className="card">
        <h3>Add User</h3>

        <input
          placeholder="Employee Code"
          value={employeeCode}
          onChange={(e) =>
            setEmployeeCode(e.target.value)
          }
        />

        <input
          placeholder="Employee Name"
          value={employeeName}
          onChange={(e) =>
            setEmployeeName(e.target.value)
          }
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="">
            Select Role
          </option>

          <option value="Admin">
            Admin
          </option>

          <option value="SM">
            SM
          </option>

          <option value="ASM">
            ASM
          </option>

          <option value="ASE">
            ASE
          </option>

          <option value="CSO">
            CSO
          </option>

          <option value="Sr. CSO">
            Sr. CSO
          </option>
        </select>

        {(role === 'CSO' ||
          role === 'Sr. CSO') && (
          <input
            placeholder="Vendor"
            value={vendor}
            onChange={(e) =>
              setVendor(e.target.value)
            }
          />
        )}

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

        <button onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <div className="card">
        <h3>User List</h3>

        <input
          placeholder="Search User"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <br />
        <br />

        {filteredUsers.map((user) => (
          <div
            key={user.employeeCode}
            style={{
              borderBottom:
                '1px solid #ccc',
              marginBottom: '10px',
              paddingBottom: '10px'
            }}
          >
            <b>
              {user.employeeName}
            </b>

            <br />

            Code:
            {' '}
            {user.employeeCode}

            <br />

            Role:
            {' '}
            {user.role}

            <br />

            Vendor:
            {' '}
            {user.vendor || '-'}

            <br />

            Status:
            {' '}
            {user.status}

            <br />

            DOJ:
            {' '}
            {user.doj}

            <br />

            LWD:
            {' '}
            {user.lwd || '-'}

            <br />

            Username:
            {' '}
            {user.username}

            <br />

            Password:
            {' '}
            {user.password}

            <br />

            {user.role !== 'Admin' && (
              <button
                onClick={() =>
                  toggleStatus(
                    user.employeeCode
                  )
                }
              >
                {user.status ===
                'Active'
                  ? 'Deactivate'
                  : 'Activate'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManagement;