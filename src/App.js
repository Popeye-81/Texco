import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setMessage('');
    } else {
      setMessage('Invalid Username or Password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMessage('');
  };

  if (isLoggedIn) {
    return (
      <div className="App">
        <div className="login-container">
          <h2>Texco Dashboard</h2>

          <div style={{ marginTop: '20px' }}>
            <button style={{ marginBottom: '10px' }}>
              Employee Management
            </button>

            <button style={{ marginBottom: '10px' }}>
              Reports
            </button>

            <button style={{ marginBottom: '10px' }}>
              Settings
            </button>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
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