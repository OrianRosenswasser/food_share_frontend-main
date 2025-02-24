import React, { useState } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))?.split('=')[1];

      const response = await axios.post(
        '/register/',
        formData,
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );

      if (response.status === 201) {
        // Redirect to home page on successful registration
        window.location.href = '/';
      }
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Registration failed. Please try again.';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstname" className="form-label">First Name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          className="form-control"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">Last Name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className="form-control"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-lg w-100">🎈 Register Now</button>
      <div className="text-center mt-3">
        <a href="/login/">Already have an account? Log in here 👉</a>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </form>
  );
};

export default RegisterForm;
