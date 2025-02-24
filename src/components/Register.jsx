import React, { useState } from 'react';
import apiService from "../services";


const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const data = await apiService.register(formData);
            console.log("Response data from apiService:", data);

            if (data.user && data.user.id) {
                setSuccessMessage('Registration successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = '/login-page';
                }, 2500);
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error("Registration failed:", error);
            let errorMessage = 'Registration failed. Please try again.';
            if (error.response && error.response.data) {
                if (typeof error.response.data === 'object' && Object.keys(error.response.data).length > 0) {
                    errorMessage = Object.entries(error.response.data)
                        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');
                } else if (typeof error.response.data.detail === 'string') {
                    errorMessage = error.response.data.detail;
                } else if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                }
            } else if (error.request) {
                errorMessage = 'A network error occurred. Please try again later.';
            } else {
                errorMessage = error.message;
            }
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="form-container">
            <h1 className="emoji">🎉 Register</h1>
               {successMessage && <div className="alert alert-success">{successMessage}</div>} {}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {}
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
                <button type="submit" disabled={isLoading} className="btn btn-lg w-100">🎈 Register Now</button>
            </form>
            <div className="text-center mt-3">
                <a href="/login-page/">Already have an account? Log in here 👉</a>
            </div>
            {errorMessage && (
                <div className="error-message" id="error-message">
                    {errorMessage}
                </div>
            )}
            <style>{`
        .form-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .form-label {
          font-weight: bold;
        }

        .btn {
          background-color: #4CAF50;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .btn:hover {
          background-color: #45a049;
        }

        .emoji {
          text-align: center;
          margin-bottom: 20px;
        }

        a {
          color: #4CAF50;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
};

export default Register;