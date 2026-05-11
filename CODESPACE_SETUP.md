# OctoFit Tracker - Codespace Setup Guide

## Configuration Complete ✓

### 1. Updated Files

#### `settings.py`
- ✓ Added `import os` for environment variable support
- ✓ Configured `CODESPACE_NAME` to read from environment variable (defaults to 'localhost')
- ✓ Updated `ALLOWED_HOSTS` to support:
  - `localhost`
  - `127.0.0.1`
  - `{CODESPACE_NAME}-8000.app.github.dev` (for GitHub Codespaces)

#### `urls.py`
- ✓ Added `/api/` prefix to all REST API endpoints
- ✓ API root endpoint: `/api/`
- ✓ All model endpoints prefixed with `/api/`

### 2. API Endpoints

All endpoints are accessible at: `https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/`

| Endpoint | Method | URL |
|----------|--------|-----|
| API Root | GET | `/api/` |
| Users | GET, POST, PUT, DELETE | `/api/users/` |
| Teams | GET, POST, PUT, DELETE | `/api/teams/` |
| Activities | GET, POST, PUT, DELETE | `/api/activities/` |
| Leaderboard | GET, POST, PUT, DELETE | `/api/leaderboard/` |
| Workouts | GET, POST, PUT, DELETE | `/api/workouts/` |
| Admin | GET | `/admin/` |

### 3. Starting the Server

#### Option A: VS Code Launch Configuration
1. Open VS Code Debug view (Ctrl+Shift+D or Cmd+Shift+D)
2. Select "Launch Django Backend" from dropdown
3. Click the green play button or press F5
4. Server will start on `0.0.0.0:8000`

#### Option B: Manual Terminal
```bash
cd octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

### 4. Testing API Endpoints

#### Test on Localhost
```bash
# Get all users
curl http://localhost:8000/api/users/

# Get all activities
curl http://localhost:8000/api/activities/

# Get all teams
curl http://localhost:8000/api/teams/

# Get leaderboard
curl http://localhost:8000/api/leaderboard/

# Get workouts
curl http://localhost:8000/api/workouts/
```

#### Test on GitHub Codespace
Replace `$CODESPACE_NAME` with your actual codespace name:
```bash
# Example: if CODESPACE_NAME is "cozy-train-4g9gxj54"
curl https://cozy-train-4g9gxj54-8000.app.github.dev/api/users/
```

#### Run Full Test Suite
```bash
bash test_api.sh
```

### 5. Environment Variables

The following environment variables are used:
- `CODESPACE_NAME`: Automatically set by GitHub Codespaces
- Falls back to 'localhost' in local development

### 6. URL Pattern Examples

**On Localhost:**
- API Root: `http://localhost:8000/api/`
- Users: `http://localhost:8000/api/users/`
- Activities: `http://localhost:8000/api/activities/`

**On Codespace:**
- API Root: `https://$CODESPACE_NAME-8000.app.github.dev/api/`
- Users: `https://$CODESPACE_NAME-8000.app.github.dev/api/users/`
- Activities: `https://$CODESPACE_NAME-8000.app.github.dev/api/activities/`

### 7. Test Results

All GET endpoints return HTTP 200 status with proper JSON data:
- ✓ API Root: Returns available endpoints
- ✓ Users: Returns user list with 4 sample users
- ✓ Teams: Returns team list (Marvel, DC)
- ✓ Activities: Returns activity list
- ✓ Leaderboard: Returns leaderboard scores
- ✓ Workouts: Returns workout suggestions

### 8. HTTPS Configuration

- ✓ No hardcoded domain in code
- ✓ Uses `$CODESPACE_NAME` environment variable
- ✓ Automatically formats as: `{CODESPACE_NAME}-8000.app.github.dev`
- ✓ No certificate issues - uses GitHub's managed SSL/TLS

### 9. Port Configuration

- **Django Backend**: Port 8000 (public)
- **MongoDB**: Port 27017 (private)
- **React Frontend**: Port 3000 (public)

### 10. Next Steps

The backend is ready for:
- Frontend development (React connects to `/api/` endpoints)
- User authentication with django-allauth
- Team creation and management
- Activity logging and tracking
- Leaderboard functionality
- Personalized workout suggestions
