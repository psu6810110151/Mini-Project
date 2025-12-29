import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard'; // Import มาใหม่

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {!isLoggedIn ? (
        // ถ้ายังไม่ Login ให้โชว์หน้า Login
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        // ถ้า Login แล้ว ให้โชว์ Dashboard
        <Dashboard />
      )}
    </div>
  );
}

export default App;