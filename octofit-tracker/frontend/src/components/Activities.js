import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching activities from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        const data = await response.json();
        
        console.log('Activities API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Processed Activities Data:', activitiesData);
        
        setActivities(activitiesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading)
    return (
      <div className="container mt-4">
        <div className="alert alert-info" role="alert">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading activities...
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
            <div className="card-header bg-success text-white">
              <h4 className="card-title mb-0">🏃 Activities Log</h4>
            </div>
            <div className="card-body">
              {activities.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                  No activities found.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Activity</th>
                        <th scope="col">Description</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Calories</th>
                        <th scope="col">User ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((activity) => (
                        <tr key={activity.id}>
                          <td>
                            <span className="badge bg-secondary">{activity.id}</span>
                          </td>
                          <td>
                            <strong>{activity.name}</strong>
                          </td>
                          <td>
                            <small>{activity.description}</small>
                          </td>
                          <td>
                            <span className="badge bg-info">{activity.duration_minutes} min</span>
                          </td>
                          <td>
                            <span className="badge bg-warning text-dark">{activity.calories_burned} cal</span>
                          </td>
                          <td>
                            <span className="badge bg-secondary">{activity.user}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-3 text-muted">
                <small>Total Activities: {activities.length}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
