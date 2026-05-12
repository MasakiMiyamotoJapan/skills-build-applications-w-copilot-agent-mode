import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching leaderboard from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        const data = await response.json();
        
        console.log('Leaderboard API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Processed Leaderboard Data:', leaderboardData);
        
        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading)
    return (
      <div className="container mt-4">
        <div className="alert alert-info" role="alert">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading leaderboard...
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

  const getRankBadgeClass = (index) => {
    if (index === 0) return 'bg-warning text-dark';
    if (index === 1) return 'bg-secondary';
    if (index === 2) return 'bg-danger';
    return 'bg-info';
  };

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '📍';
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h4 className="card-title mb-0">🏆 Leaderboard</h4>
            </div>
            <div className="card-body">
              {leaderboard.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                  No leaderboard data found.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col" style={{ width: '80px' }}>Rank</th>
                        <th scope="col">User</th>
                        <th scope="col">Points</th>
                        <th scope="col">Activities</th>
                        <th scope="col">Workouts</th>
                        <th scope="col">Team</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, index) => (
                        <tr key={entry.id}>
                          <td>
                            <span className={`badge ${getRankBadgeClass(index)}`}>
                              {getRankEmoji(index)} #{index + 1}
                            </span>
                          </td>
                          <td>
                            <strong>{entry.user}</strong>
                          </td>
                          <td>
                            <span className="badge bg-success">{entry.points} pts</span>
                          </td>
                          <td>
                            <span className="badge bg-secondary">{entry.num_activities}</span>
                          </td>
                          <td>
                            <span className="badge bg-secondary">{entry.num_workouts}</span>
                          </td>
                          <td>
                            <span className="badge bg-secondary">{entry.team || 'N/A'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-3 text-muted">
                <small>Total Entries: {leaderboard.length}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
