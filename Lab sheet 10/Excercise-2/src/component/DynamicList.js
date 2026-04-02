import React, { useState } from 'react';

const DynamicList = () => {
  const [items, setItems] = useState([
    "Complete React Lab Sheet",
    "Submit Assignment",
    "Prepare for Midterm"
  ]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Task Manager</h1>
        <p style={styles.subtitle}>Add and manage your tasks</p>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a new task..."
            style={styles.input}
          />
          <button onClick={addItem} style={styles.addButton}>
            Add Task
          </button>
        </div>

        {items.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No tasks yet. Add one above!</p>
          </div>
        ) : (
          <ul style={styles.list}>
            {items.map((item, index) => (
              <li key={index} style={styles.listItem}>
                <span style={styles.itemText}>{item}</span>
                <button 
                  onClick={() => removeItem(index)} 
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <div style={styles.footer}>
          Total Tasks: <strong>{items.length}</strong>
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
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '600px',
    padding: '40px',
  },
  title: {
    textAlign: 'center',
    color: '#1e3a8a',
    margin: '0 0 8px 0',
    fontSize: '32px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: '30px',
  },
  inputContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '30px',
  },
  input: {
    flex: 1,
    padding: '14px 18px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
  },
  addButton: {
    padding: '14px 28px',
    backgroundColor: '#4a6cf7',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: '#f8fafc',
    marginBottom: '10px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  itemText: {
    fontSize: '17px',
    color: '#1e2937',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#64748b',
    fontStyle: 'italic',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '2px dashed #cbd5e1',
  },
  footer: {
    textAlign: 'center',
    marginTop: '25px',
    color: '#64748b',
    fontSize: '15px',
  }
};

export default DynamicList;