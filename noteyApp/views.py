from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import QuestionAnswerTable, ContextTable, TopicTable, LeaderBoardTable, UserQuizTable, StatsTable
from django.contrib.auth.models import User
from .serializer import QuestionAnswerTableSerializer, ContextTableSerializer, TopicTableSerializer, LeaderBoardTableSerializer, UserQuizTableSerializer, UserSerializer, StatsTableSerializer, UserLoginSerializer, UserRegisterSerializer
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate, login
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import logout

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import datetime


@api_view(['GET'])
def dashboard(request):
    user = User.objects.filter(username='zaid')
    print(user)
    stats = StatsTable.objects.get()
    stat_serializer = StatsTableSerializer(stats)
    serializer = UserSerializer(user, many=True)
    userqa = UserQuizTable.objects.filter(user=user)
    n_topics = TopicTable.objects.filter()
    return Response({'data':serializer.data,'stats':stat_serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def createQuiz(request, num_questions=5):
    user = User.objects.get(username="zaid")
    # qa = QuestionAnswerTable.objects.all()
    qa = QuestionAnswerTable.objects.exclude(topic_id=18)
    random_qa = qa.order_by('?')[:num_questions]
    for i in random_qa:
        # print(i)
        # print(type(i.distractors))
        pass



    
        
    userQuiz = UserQuizTable.objects.create(
        user=user, date=datetime.date.today(), userAnswers={})
    userQuiz.qaTableObjects.set(random_qa)
    # print(userQuiz.qaTableObjects.all())
    answers = {}

    # populate answers dictionary
    for index, i in enumerate(random_qa):
        # answers[i.question] = i.answer
        answers[i.question] = ''
    userQuiz.userAnswers = answers
    # print(userQuiz)
    
    userQuiz.save()

    userStats = StatsTable.objects.get_or_create(user=user)
    # print(userStats[0])
    userStats[0].updateStats(user)

    # userStats.updateStats(user)
    user_qa = userQuiz.qaTableObjects.all()
    qa = QuestionAnswerTableSerializer(user_qa, many=True)


    serializer = UserQuizTableSerializer(userQuiz)
    return Response({'data':serializer.data,'qa':qa.data},status=status.HTTP_200_OK)


def updateStatsView(request):
    user = User.objects.get(username="zaid")
    userStats = StatsTable.objects.get_or_create(user=user)
    userStats[0].updateStats(user)

    response = HttpResponse("Stats updated", content_type="text/plain")
    return response


@api_view(['GET'])
def getTopics(request):
    topics = TopicTable.objects.all()
    serializer = TopicTableSerializer(topics, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def showStats(request):
    user = User.objects.get(username="zaid")
    # userStats = StatsTable.objects.get_or_create(user=user)
    # userStats[0].updateStats(user)
    serializer = StatsTableSerializer()
    return Response(serializer.data)

@api_view(['GET'])
def getContext(request, topic_id):
    context = ContextTable.objects.exclude(topic_id=18)
    context = context.filter(topic_id=topic_id)
    serializer = ContextTableSerializer(context, many=True)
    return Response(serializer.data)
