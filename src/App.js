import { useState } from 'react';
import './App.css';

import SuperMaster from './components/SuperMaster';
import DistributorMaster from './components/DistributorMaster';
import CSOMaster from './components/CSOMaster';
import RetailerMaster from './components/RetailerMaster';
import Mapping from './components/Mapping';
import Dashboard from './components/Dashboard';

function App() {
  // LOGIN STATE
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  // NAVIGATION STATE
  const [activeTab, setActiveTab] = useState('dashboard');

  // ERP MASTER DATA
  const [supers, setSupers] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [csos, setCsos] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [mapping, setMapping] = useState([]);

  // LOGIN
  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setMessage('');
      setActiveTab('dashboard');
    } else {
      setMessage('Invalid Username or Password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMessage('');
    setActiveTab('dashboard');
  };

  // ROUTING ENGINE
  const renderPage = () => {
    switch (activeTab) {
      case 'super':
        return (
          <SuperMaster
            supers={supers}
            setSupers={setSupers}
          />
        );

      case 'distributor':
        return (
          <DistributorMaster
            distributors={distributors}
            setDistributors={setDistributors}
            supers={supers}
          />
        );

      case 'cso':
        return (
          <CSOMaster
            csos={csos}
            setCsos={setCsos}
          />
        );

      case 'retailer':
        return (
          <RetailerMaster
            retailers={retailers}
            setRetailers={setRetailers}
          />
        );

      case 'mapping':
        return (
          <Mapping
            csos={csos}
            retailers={retailers}
            mapping={mapping}
            setMapping={setMapping}
          />
        );

      default:
        return (
          <Dashboard
            supers={supers}
            distributors={distributors}
            csos={csos}
            retailers={retailers}
            mapping={mapping}
          />
        );
    }
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="App">
        <div className="login-container">
          <h2>Texco ERP Login</h2>

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

          <button onClick={handleLogin}>Login</button>

          {message && <p style={{ color: 'red' }}>{message}</p>}
        </div>
      </div>
    );
  }

  // ERP MAIN UI
  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Texco ERP</h2>

        <button onClick={() => setActiveTab('dashboard')}>
          Dashboard
        </button>

        <button onClick={() => setActiveTab('super')}>
          Super Master
        </button>

        <button onClick={() => setActiveTab('distributor')}>
          Distributor Master
        </button>

        <button onClick={() => setActiveTab('cso')}>
          CSO Master
        </button>

        <button onClick={() => setActiveTab('retailer')}>
          Retailer Master
        </button>

        <button onClick={() => setActiveTab('mapping')}>
          Mapping
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;