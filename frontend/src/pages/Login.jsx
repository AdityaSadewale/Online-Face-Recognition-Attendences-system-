import React, { useState } from 'react';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    department: 'Computer Science',
    studyYear: '1st Year'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.rollNo) {
      // Logic for teacher login: rollNo starting with @prof.
      const isTeacher = formData.rollNo.toLowerCase().startsWith('@prof.');
      onLogin({ ...formData, role: isTeacher ? 'teacher' : 'student' });
    }
  };

  return (
    <div className="login-container">
      <div className="glass-panel" style={{ padding: '40px' }}>
        <h2 className="gradient-text" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '10px' }}>Attendance Portal</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '30px' }}>
          Login to access your dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{formData.rollNo.toLowerCase().startsWith('@prof.') ? 'Teacher Name' : 'Full Name'}</label>
            {formData.rollNo.toLowerCase().startsWith('@prof.') ? (
              <select
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              >
                <option value="">Select Teacher</option>
                <option value="Aditya Sadewale">Aditya Sadewale</option>
                <option value="Naveen">Naveen</option>
                <option value="Ajit">Ajit</option>
                <option value="None">None</option>
              </select>
            ) : (
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="e.g. Your Name & Surename"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}
          </div>
          <div className="form-group">
            <label>Roll No / Teacher ID</label>
            <input
              type="text"
              name="rollNo"
              className="form-control"
              placeholder="Roll No / ID"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Electronics">Electronics</option>
              <option value="Information Technology">Information Technology</option>
              <option value="None">None</option>
            </select>
          </div>

          <div className="form-group">
            <label>Study Year</label>
            <select
              name="studyYear"
              className="form-control"
              value={formData.studyYear}
              onChange={handleChange}
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="None">None</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px', padding: '14px', fontSize: '1.1rem' }}>
            Login to Portal
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
