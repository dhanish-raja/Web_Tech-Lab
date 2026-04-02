import React from 'react';

const StudentProfile = () => {
  const studentName = "Sahul Shaik";
  const department = "Computer Science and Engineering";
  const year = "3rd Year";
  const section = "A";
  const rollNumber = "21CSE101";
  const email = "origin@example.com";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Student Profile</h1>
        </div>
        <div style={styles.content}>
          <h2 style={styles.name}>{studentName}</h2>
          
          <div style={styles.details}>
            <p><strong>Department:</strong> {department}</p>
            <p><strong>Year:</strong> {year}</p>
            <p><strong>Section:</strong> {section}</p>
            <p><strong>Roll Number:</strong> {rollNumber}</p>
            <p><strong>Email:</strong> {email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    width: '420px',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#4a6cf7',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '28px',
  },
  content: {
    padding: '30px 25px',
  },
  name: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '25px',
    fontSize: '26px',
    borderBottom: '2px solid #eee',
    paddingBottom: '15px',
  },
  details: {
    fontSize: '18px',
    lineHeight: '2.2',
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  }
};

export default StudentProfile;