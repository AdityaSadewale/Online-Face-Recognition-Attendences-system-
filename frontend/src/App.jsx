import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeacherDashboard from './pages/TeacherDashboard';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [attendances, setAttendances] = useState(() => {
    const saved = localStorage.getItem('attendances');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('attendances', JSON.stringify(attendances));
  }, [attendances]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {user && (
          <header className="app-header">
            <div className="user-info-header">
              <h2 className="gradient-text" style={{ margin: 0 }}>AttendanceAI</h2>
              <span style={{ color: 'var(--text-secondary)' }}>|</span>
              <span style={{ fontWeight: 500 }}>
                {user.role === 'teacher' ? 'Professor ' : ''}{user.name} ({user.rollNo})
              </span>
            </div>
            <button className="btn btn-secondary" onClick={handleLogout}>Log Out</button>
          </header>
        )}
        
        <main className="container" style={{ display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route 
              path="/login" 
              element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={
                user ? (
                  user.role === 'teacher' ? (
                    <TeacherDashboard user={user} attendances={attendances} setAttendances={setAttendances} />
                  ) : (
                    <Dashboard user={user} attendances={attendances} setAttendances={setAttendances} />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </main>
        
        <footer className="app-footer">
          Created by Aditya <span className="heart">❤️</span> Sadewale
        </footer>
      </div>
    </Router>
  );
}

export default App;
