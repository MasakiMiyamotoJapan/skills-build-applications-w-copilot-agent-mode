import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const isNavLinkActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src="/octofitapp-small.png"
              alt="OctoFit Logo"
              className="octofit-logo me-3"
            />
            <Link className="navbar-brand fw-bold fs-5" to="/">
              🐙 OctoFit Tracker
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-2">
              <li className="nav-item">
                <Link
                  className={`nav-link nav-link-custom ${isNavLinkActive('/users')}`}
                  to="/users"
                >
                  👥 Users
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link nav-link-custom ${isNavLinkActive('/activities')}`}
                  to="/activities"
                >
                  🏃 Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link nav-link-custom ${isNavLinkActive('/workouts')}`}
                  to="/workouts"
                >
                  💪 Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link nav-link-custom ${isNavLinkActive('/teams')}`}
                  to="/teams"
                >
                  🤝 Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link nav-link-custom ${isNavLinkActive('/leaderboard')}`}
                  to="/leaderboard"
                >
                  🏆 Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid content-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mt-5 mb-5">
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow-lg border-0 home-card">
                      <div className="card-body text-center py-5">
                        <h1 className="display-4 fw-bold text-primary mb-3">
                          🐙 Welcome to OctoFit Tracker
                        </h1>
                        <p className="lead text-muted mb-4">
                          Track your fitness activities, compete with friends, and achieve your goals!
                        </p>
                        <hr className="my-4" />
                        <div className="row mt-5">
                          <div className="col-md-4 mb-3">
                            <div className="feature-card feature-card-blue">
                              <h5 className="card-title">👥 User Profiles</h5>
                              <p className="card-text text-muted">
                                Manage and view detailed user information
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="feature-card feature-card-green">
                              <h5 className="card-title">🏃 Track Activity</h5>
                              <p className="card-text text-muted">
                                Log activities and monitor your progress
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="feature-card feature-card-purple">
                              <h5 className="card-title">🏆 Compete</h5>
                              <p className="card-text text-muted">
                                Climb the leaderboard and compete with friends
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted mt-4">
                          Use the navigation menu above to get started!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white mt-auto py-4 border-top footer-custom">
        <div className="container text-center">
          <p className="mb-1">&copy; 2024 OctoFit Tracker. All rights reserved.</p>
          <small className="text-muted">Stay active, stay healthy! 💪</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
