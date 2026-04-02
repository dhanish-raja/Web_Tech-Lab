// Counter.js
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(0);
  };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Simple Counter</h1>
        
        <div style={styles.counterDisplay}>
          <span style={styles.count}>{count}</span>
        </div>

        <div style={styles.buttonGroup}>
          <button 
            style={styles.decrementBtn} 
            onClick={decrement}
          >
            - Decrement
          </button>

          <button 
            style={styles.resetBtn} 
            onClick={reset}
          >
            Reset
          </button>

          <button 
            style={styles.incrementBtn} 
            onClick={increment}
          >
            Increment +
          </button>
        </div>

        <p style={styles.info}>
          Click the buttons to change the counter value
        </p>
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
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
    width: '380px',
    padding: '40px 30px',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 30px 0',
    color: '#333',
    fontSize: '28px',
  },
  counterDisplay: {
    backgroundColor: '#f8f9fa',
    border: '3px solid #667eea',
    borderRadius: '15px',
    padding: '30px',
    margin: '20px 0',
  },
  count: {
    fontSize: '72px',
    fontWeight: 'bold',
    color: '#4a6cf7',
    fontFamily: 'monospace',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    margin: '25px 0',
  },
  incrementBtn: {
    backgroundColor: '#4ade80',
    color: 'white',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  decrementBtn: {
    backgroundColor: '#f87171',
    color: 'white',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  resetBtn: {
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  info: {
    color: '#666',
    fontSize: '14px',
    marginTop: '20px',
  }
};

export default Counter;