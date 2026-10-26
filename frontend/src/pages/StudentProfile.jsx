import React, { useState, useEffect } from 'react';

function StudentProfile() {
  const [student, setStudent] = useState({
    name: "Aditya Sadewale",
    studentId: "CS-2023-001",
    totalPercentage: 85,
    slots: [
      { id: "09:00 - 10:00", present: true },
      { id: "10:00 - 11:00", present: true },
      { id: "11:00 - 12:00", present: false },
      { id: "12:00 - 13:00", present: true },
      { id: "14:00 - 15:00", present: false }
    ]
  });

  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
        <div className="student-avatar" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
          {student.name.charAt(0)}
        </div>
        <div>
          <h2 className="gradient-text" style={{ margin: 0, fontSize: '2rem' }}>{student.name}</h2>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>ID: {student.studentId}</p>
        </div>
      </div>

      <h3>Overall Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{student.totalPercentage}%</div>
          <div className="stat-label">Daily Attendance</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{student.slots.filter(s => s.present).length} / {student.slots.length}</div>
          <div className="stat-label">Slots Attended</div>
        </div>
      </div>

      <h3 style={{ marginTop: '40px' }}>Today's Hourly Slots</h3>
      <div className="slot-grid">
        {student.slots.map((slot, index) => (
          <div key={index} className={`slot-item ${slot.present ? 'present' : ''}`}>
            <div>{slot.id}</div>
            <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
              {slot.present ? 'Present' : 'Absent'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentProfile;
