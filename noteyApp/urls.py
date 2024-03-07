from django.urls import path
from . import views
from django.conf import settings

urlpatterns = [
# path('', views.getUserName),
path('quiz/', views.createQuiz),
path('dashboard/', views.dashboard ),
path('updateStats/', views.updateStatsView),
path('learn/', views.getTopics),
# path('signin/', views.UserLogin.as_view()),
# path('signup/', views.UserRegistration.as_view() ),
# path('logout/', views.UserLogout.as_view() ),
# path('user/', views.UserView.as_view()  ),

]