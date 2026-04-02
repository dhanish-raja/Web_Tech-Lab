import React, { useState } from 'react';
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (validateForm()) {
      setSuccessMessage(`✅ Registration Successful! Welcome, ${formData.name}`);
      setFormData({ name: '', email: '', password: '' });
      setErrors({ name: '', email: '', password: '' });
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student Registration</h1>
        <p style={styles.subtitle}>Please fill in your details</p>

        {successMessage && (
          <div style={styles.successMessage}>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your full name"
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="example@vitap.ac.in"
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Create a strong password"
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          <button type="submit" style={styles.submitButton}>
            Register Now
          </button>
        </form>
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
    maxWidth: '420px',
    padding: '40px 35px',
  },
  title: {
    textAlign: 'center',
    color: '#1e3a8a',
    margin: '0 0 8px 0',
    fontSize: '28px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: '30px',
    fontSize: '16px',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'border 0.3s',
    outline: 'none',
  },
  error: {
    color: '#ef4444',
    fontSize: '14px',
    marginTop: '6px',
    display: 'block',
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#4a6cf7',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  successMessage: {
    backgroundColor: '#d1fae5',
    color: '#10b981',
    padding: '14px',
    borderRadius: '10px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '600',
    border: '1px solid #a7f3d0',
  },
};

export default RegistrationForm;