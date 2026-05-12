import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        const data = await response.json();
        
        console.log('Workouts API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Processed Workouts Data:', workoutsData);
        
        setWorkouts(workoutsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading)
    return (
      <div className="container mt-4">
        <div className="alert alert-info" role="alert">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading workouts...
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

  const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-success';
      case 'medium':
        return 'bg-warning text-dark';
      case 'hard':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-danger text-white">
              <h4 className="card-title mb-0">💪 Workout Programs</h4>
            </div>
            <div className="card-body">
              {workouts.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                  No workouts found.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Workout</th>
                        <th scope="col">Description</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Type</th>
                        <th scope="col">Difficulty</th>
                        <th scope="col">User ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workouts.map((workout) => (
                        <tr key={workout.id}>
                          <td>
                            <span className="badge bg-secondary">{workout.id}</span>
                          </td>
                          <td>
                            <strong>{workout.name}</strong>
                          </td>
                          <td>
                            <small>{workout.description}</small>
                          </td>
                          <td>
                            <span className="badge bg-info">{workout.duration_minutes} min</span>
                          </td>
                          <td>
                            <span className="badge bg-secondary">{workout.type}</span>
                          </td>
                          <td>
                            <span className={`badge ${getDifficultyBadgeClass(workout.difficulty)}`}>
                              {workout.difficulty}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-secondary">{workout.user}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-3 text-muted">
                <small>Total Workouts: {workouts.length}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
