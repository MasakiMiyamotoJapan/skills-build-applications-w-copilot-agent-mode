import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching teams from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        const data = await response.json();
        
        console.log('Teams API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Processed Teams Data:', teamsData);
        
        setTeams(teamsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading)
    return (
      <div className="container mt-4">
        <div className="alert alert-info" role="alert">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading teams...
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
            <div className="card-header bg-warning text-dark">
              <h4 className="card-title mb-0">🤝 Team Management</h4>
            </div>
            <div className="card-body">
              {teams.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                  No teams found.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Team Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Members</th>
                        <th scope="col">Captain ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team) => (
                        <tr key={team.id}>
                          <td>
                            <span className="badge bg-secondary">{team.id}</span>
                          </td>
                          <td>
                            <strong>{team.name}</strong>
                          </td>
                          <td>
                            <small>{team.description}</small>
                          </td>
                          <td>
                            <span className="badge bg-info">
                              {team.members ? team.members.length : 0} member{team.members && team.members.length !== 1 ? 's' : ''}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-secondary">{team.captain}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-3 text-muted">
                <small>Total Teams: {teams.length}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
