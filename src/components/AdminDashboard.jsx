// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      const data = await apiService.getUserStats(accessToken);
      setUsers(data);
    } catch (error) {
      console.error('Error loading user stats:', error);
      setError('Failed to load user statistics');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="container mt-5">Loading user statistics...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title h4 mb-0">Admin Dashboard</h2>
        </div>
        <div className="card-body">
          {/* Summary Statistics */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text h2">{users.length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title">Total Posts</h5>
                  <p className="card-text h2">
                    {users.reduce((sum, user) => sum + user.posts_count, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-dark">
                <div className="card-body">
                  <h5 className="card-title">Total Requests</h5>
                  <p className="card-text h2">
                    {users.reduce((sum, user) => sum + user.requests_count, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h5 className="card-title">Active Users</h5>
                  <p className="card-text h2">
                    {users.filter(user => user.is_active).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Users Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Posts</th>
                  <th>Requests</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstname} {user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.is_active ? 'bg-success' : 'bg-danger'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{user.posts_count}</td>
                    <td>{user.requests_count}</td>
                    <td>
                      <span className={`badge ${user.is_staff ? 'bg-primary' : 'bg-secondary'}`}>
                        {user.is_staff ? 'Admin' : 'User'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
//