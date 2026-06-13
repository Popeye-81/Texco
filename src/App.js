import { useState } from 'react';
import './App.css';

import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Reports from './components/Reports';
import Settings from './components/Settings';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [activePage, setActivePage] = useState('dashboard');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setMessage('');
      setActivePage('dashboard');
    } else {
      setMessage('Invalid Username or Password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMessage('');
    setActivePage('dashboard');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'employees':
        return <Employees />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoggedIn) {
    return (
      <div className="dashboard">
        <div className="sidebar">
          <h2>Texco</h2>

          <button onClick={() => setActivePage('dashboard')}>
            Dashboard
          </button>

          <button onClick={() => setActivePage('employees')}>
            Employee Management
          </button>

          <button onClick={() => setActivePage('reports')}>
            Reports
          </button>

          <button onClick={() => setActivePage('settings')}>
            Settings
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="main-content">
          {renderPage()}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="login-container">
        <h2>Texco Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;