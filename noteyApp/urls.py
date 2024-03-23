from django.urls import path
from . import views
from django.conf import settings

urlpatterns = [
# path('', views.getUserName),
path('quiz/', views.createQuiz),
path('dashboard/', views.dashboard ),
path('updateStats/', views.updateStatsView),
path('learn/', views.getTopics),
path('context/<int:topic_id>/', views.getContext),
# path('stats/', views.showStats),
path('getQATopics/', views.getQATopics),
path('getLatestThree/', views.getLatestThree),
path('getFiveDayCount/', views.getFiveDayCount),

path('signin/', views.UserSigninView),
path('signout/', views.UserSignoutView),
# path('api-token-auth/', ObtainAuthToken.as_view()),
]