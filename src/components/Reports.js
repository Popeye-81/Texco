function Reports() {
  return (
    <div>
      <h1>Reports</h1>

      <p>
        Generate and review reports from the Texco system.
      </p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Monthly Reports</h3>
          <p>12</p>
        </div>

        <div className="card">
          <h3>Pending Reports</h3>
          <p>3</p>
        </div>

        <div className="card">
          <h3>Completed Reports</h3>
          <p>45</p>
        </div>
      </div>
    </div>
  );
}

export default Reports;