import React, { useState, useEffect } from 'react';

function LiveAttendance() {
  const [logs, setLogs] = useState([]);
  
  // Dummy logs for UI presentation before backend integration
  useEffect(() => {
    // In production, this would fetch from the backend API or connect to a websocket
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/attendance/live/');
        if (response.ok) {
          const data = await response.json();
          setLogs(data);
        }
      } catch (error) {
        console.log("Backend not connected yet. Using dummy data.");
        setLogs([
          { id: 1, name: "Aditya Sadewale", time: new Date().toLocaleTimeString(), status: "Present" },
          { id: 2, name: "Navnath", time: new Date(Date.now() - 60000).toLocaleTimeString(), status: "Present" }
        ]);
      }
    };
    
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-layout">
      
      {/* Main Video Section */}
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Live Camera Feed</h3>
          <div className="recording-indicator">
            <div className="red-dot"></div>
            LIVE
          </div>
        </div>
        
        <div className="video-container">
          {/* This img tag streams the MJPEG from the backend */}
          <img 
            src="http://localhost:8000/api/video-feed/" 
            alt="Live Video Feed" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div style="color: #666; text-align: center; padding: 100px;">Camera feed offline. Start the backend face_recognizer script.</div>';
            }}
          />
        </div>
      </div>

      {/* Sidebar Logs Section */}
      <div className="glass-panel">
        <h3 style={{ marginBottom: '20px' }}>Recently Marked Present</h3>
        <ul className="log-list">
          {logs.map((log, index) => (
            <li key={index} className="log-item success">
              <div className="student-avatar">
                {log.name.charAt(0)}
              </div>
              <div className="log-details">
                <h4 className="log-name">{log.name}</h4>
                <p className="log-time">{log.time} • {log.status}</p>
              </div>
            </li>
          ))}
          {logs.length === 0 && (
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>
              No students detected yet in this slot.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default LiveAttendance;
