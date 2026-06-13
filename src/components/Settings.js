function Settings() {
  return (
    <div>
      <h1>Settings</h1>

      <p>
        Configure Texco application preferences and user settings.
      </p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Profile</h3>
          <p>Manage</p>
        </div>

        <div className="card">
          <h3>Security</h3>
          <p>Update</p>
        </div>

        <div className="card">
          <h3>Notifications</h3>
          <p>Enabled</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;