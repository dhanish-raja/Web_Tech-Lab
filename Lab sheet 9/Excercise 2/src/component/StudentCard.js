import React from 'react';
const StudentCard = ({ name, department, marks, rollNo, year }) => {
  const getGrade = (marks) => {
    if (marks >= 90) return { grade: 'A+', color: '#22c55e' };
    if (marks >= 80) return { grade: 'A', color: '#4ade80' };
    if (marks >= 70) return { grade: 'B', color: '#eab308' };
    if (marks >= 60) return { grade: 'C', color: '#f97316' };
    return { grade: 'D', color: '#ef4444' };
  };

  const { grade, color } = getGrade(marks);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.avatar}>
          {name.charAt(0)}
        </div>
        <div>
          <h3 style={styles.name}>{name}</h3>
          <p style={styles.rollNo}>{rollNo}</p>
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.infoRow}>
          <span style={styles.label}>Department:</span>
          <span style={styles.value}>{department}</span>
        </div>
        
        <div style={styles.infoRow}>
          <span style={styles.label}>Year</span>
          <span style={styles.value}>{year}</span>
        </div>

        <div style={styles.marksSection}>
          <div style={styles.marksContainer}>
            <span style={styles.marksLabel}>Marks</span>
            <span style={{ ...styles.marks, color }}>{marks}</span>
          </div>
          
          <div style={styles.gradeContainer}>
            <span style={styles.gradeLabel}>Grade</span>
            <span style={{ ...styles.grade, backgroundColor: color }}>
              {grade}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '320px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
    },
  },
  header: {
    background: 'linear-gradient(135deg, #4a6cf7, #667eea)',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    color: 'white',
  },
  avatar: {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    border: '3px solid rgba(255,255,255,0.6)',
  },
  name: {
    margin: '0',
    fontSize: '20px',
    fontWeight: '600',
  },
  rollNo: {
    margin: '4px 0 0 0',
    opacity: '0.9',
    fontSize: '14px',
  },
  body: {
    padding: '25px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '14px',
    paddingBottom: '14px',
    borderBottom: '1px solid #f1f1f1',
  },
  label: {
    color: '#666',
    fontSize: '15px',
  },
  value: {
    fontWeight: '600',
    color: '#333',
    fontSize: '15px',
  },
  marksSection: {
    marginTop: '20px',
    display: 'flex',
    gap: '20px',
  },
  marksContainer: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#f8fafc',
    padding: '15px',
    borderRadius: '12px',
  },
  marksLabel: {
    display: 'block',
    color: '#666',
    fontSize: '13px',
    marginBottom: '6px',
  },
  marks: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  gradeContainer: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#f8fafc',
    padding: '15px',
    borderRadius: '12px',
  },
  gradeLabel: {
    display: 'block',
    color: '#666',
    fontSize: '13px',
    marginBottom: '6px',
  },
  grade: {
    display: 'inline-block',
    padding: '6px 18px',
    borderRadius: '30px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
  },
};

export default StudentCard;