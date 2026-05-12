import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching users from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        const data = await response.json();
        
        console.log('Users API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Processed Users Data:', usersData);
        
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="container mt-4">
        <div className="alert alert-info" role="alert">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading users...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="card-title mb-0">👥 Users Portal</h4>
            </div>
            <div className="card-body">
              {users.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                  No users found.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <span className="badge bg-secondary">{user.id}</span>
                          </td>
                          <td>
                            <strong>{user.username}</strong>
                          </td>
                          <td>
                            <a href={`mailto:${user.email}`} className="link-primary">
                              {user.email}
                            </a>
                          </td>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-3 text-muted">
                <small>Total Users: {users.length}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
