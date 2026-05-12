from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(team.name, 'Test Team')

    def test_activity_creation(self):
        user = get_user_model().objects.create(username='testuser')
        team = Team.objects.create(name='Test Team')
        activity = Activity.objects.create(user=user, type='run', duration=10, distance=1.5)
        self.assertEqual(activity.type, 'run')

    def test_leaderboard_creation(self):
        user = get_user_model().objects.create(username='testuser2')
        leaderboard = Leaderboard.objects.create(user=user, score=50)
        self.assertEqual(leaderboard.score, 50)

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Test Workout', description='desc', difficulty='Easy')
        self.assertEqual(workout.name, 'Test Workout')
