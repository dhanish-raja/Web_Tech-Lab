import React from 'react';
import StudentCard from './component/StudentCard';

function App() {
  const students = [
    {
      name: "Prasanth",
      department: "Computer Science & Engineering",
      marks: 92,
      rollNo: "21CSE101",
      year: "3rd Year"
    },
    {
      name: "Aarav Sharma",
      department: "Electronics & Communication",
      marks: 85,
      rollNo: "21ECE045",
      year: "3rd Year"
    },
    {
      name: "Priya Reddy",
      department: "Mechanical Engineering",
      marks: 78,
      rollNo: "21MEC112",
      year: "2nd Year"
    },
    {
      name: "Rahul Verma",
      department: "Computer Science & Engineering",
      marks: 95,
      rollNo: "21CSE078",
      year: "3rd Year"
    },
    {
      name: "Sneha Patel",
      department: "Information Technology",
      marks: 88,
      rollNo: "21IT056",
      year: "4th Year"
    }
  ];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>VIT-AP UNIVERSITY</h1>
        <p style={styles.subtitle}>Student Information Portal</p>
      </div>

      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Student Cards</h2>
        
        <div style={styles.cardGrid}>
          {students.map((student, index) => (
            <StudentCard
              key={index}
              name={student.name}
              department={student.department}
              marks={student.marks}
              rollNo={student.rollNo}
              year={student.year}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  mainTitle: {
    color: '#1e40af',
    fontSize: '42px',
    margin: '0',
    fontWeight: '700',
  },
  subtitle: {
    color: '#475569',
    fontSize: '18px',
    margin: '8px 0 0 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    textAlign: 'center',
    color: '#1e3a8a',
    marginBottom: '30px',
    fontSize: '28px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '25px',
    justifyContent: 'center',
  },
};

export default App;
