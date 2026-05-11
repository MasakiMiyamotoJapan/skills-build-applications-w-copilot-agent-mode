#!/bin/bash
# OctoFit Tracker - Quick API Test Commands

# ============================================
# LOCALHOST TESTING
# ============================================

# API Root
curl http://localhost:8000/api/

# Users List
curl http://localhost:8000/api/users/

# Teams List
curl http://localhost:8000/api/teams/

# Activities List
curl http://localhost:8000/api/activities/

# Leaderboard
curl http://localhost:8000/api/leaderboard/

# Workouts
curl http://localhost:8000/api/workouts/

# ============================================
# GITHUB CODESPACE TESTING
# Replace $CODESPACE_NAME with your actual name
# ============================================

# Example: cozy-train-4g9gxj54-8000.app.github.dev

# API Root
# curl https://$CODESPACE_NAME-8000.app.github.dev/api/

# Users List
# curl https://$CODESPACE_NAME-8000.app.github.dev/api/users/

# Teams List
# curl https://$CODESPACE_NAME-8000.app.github.dev/api/teams/

# Activities List
# curl https://$CODESPACE_NAME-8000.app.github.dev/api/activities/

# Leaderboard
# curl https://$CODESPACE_NAME-8000.app.github.dev/api/leaderboard/

# Workouts
# curl https://$CODESPACE_NAME-8000.app.github.dev/api/workouts/

# ============================================
# STATUS CHECK (all should return 200)
# ============================================

curl -s -o /dev/null -w "API Root: %{http_code}\n" http://localhost:8000/api/
curl -s -o /dev/null -w "Users: %{http_code}\n" http://localhost:8000/api/users/
curl -s -o /dev/null -w "Teams: %{http_code}\n" http://localhost:8000/api/teams/
curl -s -o /dev/null -w "Activities: %{http_code}\n" http://localhost:8000/api/activities/
curl -s -o /dev/null -w "Leaderboard: %{http_code}\n" http://localhost:8000/api/leaderboard/
curl -s -o /dev/null -w "Workouts: %{http_code}\n" http://localhost:8000/api/workouts/
