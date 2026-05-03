import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Edit2, Trash2, Download, CheckCircle, XCircle } from 'lucide-react';

function TeacherDashboard({ user, attendances, setAttendances }) {
  const [editingId, setEditingId] = useState(null);
  const [editLecture, setEditLecture] = useState('');

  // Statistics
  const today = new Date().toISOString().split('T')[0];
  const todayAttendances = attendances.filter(a => a.date === today);
  const uniqueStudents = [...new Set(attendances.map(a => a.rollNo))].length;
  const presentToday = [...new Set(todayAttendances.map(a => a.rollNo))].length;

  // Lecture-wise counts
  const lectureSlots = [
    "Lecture 1 (9:00 AM - 10:00 AM)",
    "Lecture 2 (10:00 AM - 11:00 AM)",
    "Lecture 3 (11:00 AM - 12:00 PM)",
    "Lecture 4 (1:00 PM - 2:00 PM)",
    "Lecture 5 (2:00 PM - 3:00 PM)"
  ];

  const lectureCounts = lectureSlots.map(slot => ({
    name: slot,
    count: todayAttendances.filter(a => a.lecture === slot).length
  }));

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setAttendances(attendances.filter(a => a.id !== id));
    }
  };

  const startEdit = (record) => {
    // Check if edit count reached limit of 2
    if ((record.editCount || 0) >= 2) {
      alert("This record has already been edited 2 times. No further changes allowed.");
      return;
    }
    setEditingId(record.id);
    setEditLecture(record.lecture);
  };

  const saveEdit = (id) => {
    const updated = attendances.map(a => {
      if (a.id === id) {
        return { 
          ...a, 
          lecture: editLecture, 
          editCount: (a.editCount || 0) + 1 
        };
      }
      return a;
    });
    setAttendances(updated);
    setEditingId(null);
  };

  const exportToExcel = () => {
    const dataToExport = attendances.map(a => ({
      Date: a.date,
      Time: a.time,
      "Student Name": a.name,
      "Roll No": a.rollNo,
      Department: a.department,
      Year: a.studyYear,
      Lecture: a.lecture,
      Status: a.status,
      "Edits Made": a.editCount || 0
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Records");
    XLSX.writeFile(workbook, `Attendance_Report_${today}.xlsx`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="gradient-text" style={{ fontSize: '2rem', margin: 0 }}>Teacher Dashboard</h2>
        <button className="btn btn-primary" onClick={exportToExcel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={18} /> Export Excel
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="stat-card glass-panel">
          <div className="stat-value">{uniqueStudents}</div>
          <div className="stat-label">Total Registered Students</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-value">{presentToday}</div>
          <div className="stat-label">Students Present Today</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-value">{todayAttendances.length}</div>
          <div className="stat-label">Total Lectures Logged Today</div>
        </div>
      </div>

      {/* Lecture-wise Summary List */}
      <div className="glass-panel" style={{ width: '100%' }}>
        <h3 className="gradient-text" style={{ marginBottom: '20px' }}>Lecture-wise Attendance (Today)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {lectureCounts.map((lc, index) => (
            <div key={index} style={{ 
              padding: '16px', 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '12px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{lc.name}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{lc.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Master Table */}
      <div className="glass-panel" style={{ width: '100%' }}>
        <h3 className="gradient-text" style={{ marginBottom: '20px' }}>Master Attendance Records</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Student Info</th>
                <th>Lecture Slot</th>
                <th>Dept / Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendances.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                [...attendances].reverse().map(record => (
                  <tr key={record.id}>
                    <td>{record.date} <br/> <small>{record.time}</small></td>
                    <td>
                      <strong>{record.name}</strong><br/>
                      <small>{record.rollNo}</small>
                    </td>
                    <td>
                      {editingId === record.id ? (
                        <select 
                          className="form-control" 
                          value={editLecture} 
                          onChange={(e) => setEditLecture(e.target.value)}
                          style={{ padding: '8px', fontSize: '0.8rem' }}
                        >
                          <option value="Lecture 1 (9:00 AM - 10:00 AM)">Lecture 1</option>
                          <option value="Lecture 2 (10:00 AM - 11:00 AM)">Lecture 2</option>
                          <option value="Lecture 3 (11:00 AM - 12:00 PM)">Lecture 3</option>
                          <option value="Lecture 4 (1:00 PM - 2:00 PM)">Lecture 4</option>
                          <option value="Lecture 5 (2:00 PM - 3:00 PM)">Lecture 5</option>
                        </select>
                      ) : (
                        record.lecture
                      )}
                    </td>
                    <td>{record.department} <br/> <small>{record.studyYear}</small></td>
                    <td><span className="status-badge status-present">{record.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {editingId === record.id ? (
                          <button onClick={() => saveEdit(record.id)} className="btn-icon" style={{ color: 'var(--success-color)' }}>
                            <CheckCircle size={18} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => startEdit(record)} 
                            className="btn-icon" 
                            title="Edit (Max 2)"
                            disabled={(record.editCount || 0) >= 2}
                            style={{ opacity: (record.editCount || 0) >= 2 ? 0.3 : 1 }}
                          >
                            <Edit2 size={18} />
                          </button>
                        )}
                        <button onClick={() => handleDelete(record.id)} className="btn-icon" style={{ color: 'var(--danger-color)' }} title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <small style={{ fontSize: '0.7rem', display: 'block', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        Edits: {record.editCount || 0}/2
                      </small>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
