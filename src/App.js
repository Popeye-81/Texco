import { useState } from 'react';
import './App.css';

import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Reports from './components/Reports';
import Settings from './components/Settings';
import DealerRetailer from './components/DealerRetailer';

import ASEMaster from './components/ASEMaster';
import ASMMaster from './components/ASMMaster';
import SMMaster from './components/SMMaster';
import StateMaster from './components/StateMaster';
import ProductMaster from './components/ProductMaster';
import OrderFormat from './components/OrderFormat';
import OrderApproval from './components/OrderApproval';

import UserManagement from './components/UserManagement';

import { ROLE_PERMISSIONS } from './config/roles';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [activePage, setActivePage] = useState('dashboard');

  const [role, setRole] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // 🔐 UPDATED LOGIN (JWT BACKEND)
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // store token
        localStorage.setItem("token", data.token);

        // set user state
        setRole(data.role);
        setCurrentUser({ username: data.username, role: data.role });

        setIsLoggedIn(true);
        setActivePage("dashboard");
        setMessage('');
      } else {
        setMessage("Invalid Username or Password");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setRole('');
    setCurrentUser(null);
    setActivePage('dashboard');
    setMessage('');

    // clear token
    localStorage.removeItem("token");
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;

      case 'users':
        return <UserManagement />;

      case 'employees':
        return <Employees />;

      case 'reports':
        return <Reports />;

      case 'settings':
        return <Settings />;

      case 'dealer':
        return <DealerRetailer />;

      case 'ase':
        return <ASEMaster />;

      case 'asm':
        return <ASMMaster />;

      case 'sm':
        return <SMMaster />;

      case 'state':
        return <StateMaster />;

      case 'product':
        return <ProductMaster />;

      case 'order':
        return <OrderFormat role={role} currentUser={currentUser} />;

      case 'approval':
        return <OrderApproval role={role} currentUser={currentUser} />;

      default:
        return <Dashboard />;
    }
  };

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

          <button onClick={handleLogin}>
            Login
          </button>

          {message && (
            <p style={{ color: 'red' }}>{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Texco ERP</h2>

        {/* CORE */}
        <button onClick={() => setActivePage('dashboard')}>Dashboard</button>
        <button onClick={() => setActivePage('users')}>User Management</button>
        <button onClick={() => setActivePage('employees')}>Employees</button>
        <button onClick={() => setActivePage('reports')}>Reports</button>
        <button onClick={() => setActivePage('settings')}>Settings</button>

        <hr />

        {/* SALES */}
        <button onClick={() => setActivePage('dealer')}>Dealer & Retailer</button>
        <button onClick={() => setActivePage('ase')}>ASE Master</button>
        <button onClick={() => setActivePage('asm')}>ASM Master</button>
        <button onClick={() => setActivePage('sm')}>SM Master</button>
        <button onClick={() => setActivePage('state')}>State Master</button>

        <hr />

        {/* ORDER MODULES (ROLE BASED UI) */}
        {ROLE_PERMISSIONS[role]?.createOrder && (
          <button onClick={() => setActivePage('product')}>
            Product Master
          </button>
        )}

        {ROLE_PERMISSIONS[role]?.createOrder && (
          <button onClick={() => setActivePage('order')}>
            Order Format
          </button>
        )}

        {ROLE_PERMISSIONS[role]?.approveOrder && (
          <button onClick={() => setActivePage('approval')}>
            Order Approval
          </button>
        )}

        <hr />

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

export default App;