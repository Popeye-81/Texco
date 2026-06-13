function Employees() {
  return (
    <div>
      <h1>Employee Management</h1>

      <p>
        This module will allow you to add, view, edit, and delete employee
        records.
      </p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Employees</h3>
          <p>125</p>
        </div>

        <div className="card">
          <h3>Active Employees</h3>
          <p>118</p>
        </div>

        <div className="card">
          <h3>On Leave</h3>
          <p>7</p>
        </div>
      </div>
    </div>
  );
}

export default Employees;