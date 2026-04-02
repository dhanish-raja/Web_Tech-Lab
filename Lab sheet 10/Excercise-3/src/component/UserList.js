import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingCard}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading users from API...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard}>
          <h2 style={styles.errorTitle}>❌ Something went wrong</h2>
          <p style={styles.errorMessage}>{error}</p>
          <button 
            style={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Users Directory</h1>
        <p style={styles.subtitle}>
          Fetched from JSONPlaceholder API • {users.length} users loaded
        </p>
      </div>

      <div style={styles.grid}>
        {users.map((user) => (
          <div key={user.id} style={styles.card}>
            <div style={styles.avatar}>
              {user.name.charAt(0)}
            </div>
            
            <h3 style={styles.name}>{user.name}</h3>
            <p style={styles.username}>@{user.username}</p>

            <div style={styles.info}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Company:</strong> {user.company.name}</p>
              <p><strong>Website:</strong> 
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" style={styles.link}>
                  {user.website}
                </a>
              </p>
            </div>

            <div style={styles.address}>
              <strong>Address:</strong><br />
              {user.address.suite}, {user.address.street}<br />
              {user.address.city}, {user.address.zipcode}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    color: '#1e40af',
    fontSize: '42px',
    margin: '0 0 10px 0',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '18px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '28px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  avatar: {
    width: '70px',
    height: '70px',
    background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 auto 16px',
  },
  name: {
    textAlign: 'center',
    margin: '0 0 4px 0',
    color: '#1e3a8a',
    fontSize: '22px',
  },
  username: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: '20px',
    fontSize: '16px',
  },
  info: {
    lineHeight: '1.8',
    color: '#374151',
    fontSize: '15px',
  },
  address: {
    marginTop: '18px',
    paddingTop: '18px',
    borderTop: '1px solid #e2e8f0',
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: '1.6',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
  },
  loadingCard: {
    maxWidth: '400px',
    margin: '100px auto',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '60px 40px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '6px solid #e5e7eb',
    borderTop: '6px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  loadingText: {
    color: '#64748b',
    fontSize: '18px',
  },
  errorCard: {
    maxWidth: '420px',
    margin: '100px auto',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '50px 40px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  errorTitle: {
    color: '#ef4444',
    marginBottom: '15px',
  },
  errorMessage: {
    color: '#64748b',
    marginBottom: '25px',
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default UserList;