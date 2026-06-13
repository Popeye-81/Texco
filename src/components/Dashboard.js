function Dashboard() {
  return (
    <div>
      <h1>Welcome to Texco</h1>
      <p>Select an option from the menu.</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Employees</h3>
          <p>125</p>
        </div>

        <div className="card">
          <h3>Reports</h3>
          <p>18</p>
        </div>

        <div className="card">
          <h3>Pending Tasks</h3>
          <p>7</p>
        </div>

        <div className="card">
          <h3>Settings</h3>
          <p>Updated</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;