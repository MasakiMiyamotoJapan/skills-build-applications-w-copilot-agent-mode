from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Leaderboard, Workout
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Deleting old data...'))
        User = get_user_model()
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        self.stdout.write(self.style.SUCCESS('Creating users...'))
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='pass', first_name='Tony', last_name='Stark'),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='pass', first_name='Peter', last_name='Parker'),
            User.objects.create_user(username='batman', email='batman@dc.com', password='pass', first_name='Bruce', last_name='Wayne'),
            User.objects.create_user(username='superman', email='superman@dc.com', password='pass', first_name='Clark', last_name='Kent'),
        ]

        # チーム割り当て（Userモデルにteamフィールドが必要な場合はカスタムUserを実装）

        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        activities = [
            Activity.objects.create(user=users[0], type='run', duration=30, distance=5),
            Activity.objects.create(user=users[1], type='cycle', duration=60, distance=20),
            Activity.objects.create(user=users[2], type='swim', duration=45, distance=2),
            Activity.objects.create(user=users[3], type='run', duration=50, distance=10),
        ]

        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        workouts = [
            Workout.objects.create(name='Morning Cardio', description='Cardio for all heroes', difficulty='Easy'),
            Workout.objects.create(name='Strength Training', description='Strength for all heroes', difficulty='Hard'),
        ]

        self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
        Leaderboard.objects.create(user=users[0], score=100)
        Leaderboard.objects.create(user=users[1], score=80)
        Leaderboard.objects.create(user=users[2], score=90)
        Leaderboard.objects.create(user=users[3], score=95)

        self.stdout.write(self.style.SUCCESS('Creating unique index on email field for users...'))
        with connection.cursor() as cursor:
            try:
                cursor.execute('db.users.createIndex({ "email": 1 }, { unique: true })')
            except Exception as e:
                self.stdout.write(self.style.WARNING(f'Index creation failed or already exists: {e}'))

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
