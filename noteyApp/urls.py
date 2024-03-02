from django.urls import path
from . import views
from django.conf import settings

urlpatterns = [
# path('', views.getUserName),
path('quiz/', views.createQuiz),
path('dashboard/', views.dashboard),

]