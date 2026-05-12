#!/bin/bash

# OctoFit Tracker API Test Script
# This script tests all API endpoints

# Determine the base URL
# Use codespace URL if CODESPACE_NAME is set, otherwise use localhost
if [ -z "$CODESPACE_NAME" ]; then
    BASE_URL="http://localhost:8000"
else
    BASE_URL="https://$CODESPACE_NAME-8000.app.github.dev"
fi

echo "=========================================="
echo "OctoFit Tracker API Test"
echo "=========================================="
echo "Testing Base URL: $BASE_URL"
echo ""

# Helper function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    echo "Testing: $method $endpoint"
    curl -s -X "$method" "$BASE_URL$endpoint" -H "Content-Type: application/json" | python3 -m json.tool 2>/dev/null || curl -s -X "$method" "$BASE_URL$endpoint"
    echo ""
    echo "---"
    echo ""
}

# Test all endpoints
echo "1. API Root"
test_endpoint "GET" "/api/"

echo "2. Users Endpoint"
test_endpoint "GET" "/api/users/"

echo "3. Teams Endpoint"
test_endpoint "GET" "/api/teams/"

echo "4. Activities Endpoint"
test_endpoint "GET" "/api/activities/"

echo "5. Leaderboard Endpoint"
test_endpoint "GET" "/api/leaderboard/"

echo "6. Workouts Endpoint"
test_endpoint "GET" "/api/workouts/"

echo "=========================================="
echo "API Test Complete"
echo "=========================================="
