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
    print(request)
    if request.user.is_authenticated:
        
        user = User.objects.filter(username=request.user)
        
        print(request.user)
        
        stats, created = StatsTable.objects.get_or_create(user=user[0])
        stat_serializer = StatsTableSerializer(stats)
        serializer = UserSerializer(user, many=True)
        # userqa = UserQuizTable.objects.filter(user=user)
        # n_topics = TopicTable.objects.filter()
        return Response({'data':serializer.data,'stats':stat_serializer.data}, status=status.HTTP_200_OK)
    else:
        return Response("User not authenticated", status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def createQuiz(request, num_questions=5):
    user = User.objects.get(username="zaid")
    # qa = QuestionAnswerTable.objects.all()
    qa = QuestionAnswerTable.objects.exclude(topic_id=18)
    random_qa = qa.order_by('?')[:num_questions]
    for i in random_qa:
        # print(i)
        # print(type(i.distractors))
        unique_values = set()
        unique_distractors = {}

        for key, value in i.distractors.items():
            if value.strip() not in unique_values:
                unique_values.add(value.strip())
                unique_distractors[key] = value.strip()
        # print(unique_distractors)
        i.distractors = unique_distractors
        qaobject = QuestionAnswerTable.objects.get(id=i.id)
        qaobject.distractors = unique_distractors
        qaobject.save()
        # print(i.distractors)



    
        
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
def getLatestThree(request):
    user = User.objects.get(username="zaid")
    userQuiz = UserQuizTable.objects.filter(user=user).order_by('-date')[:3]
    
    serializer = UserQuizTableSerializer(userQuiz, many=True)
    date_dict = {}
    for index, i in enumerate(serializer.data):
        date_dict[index] = i['date']
    return Response(date_dict)

@api_view(['GET'])
def getFiveDayCount(request):
    user = User.objects.get(username="zaid")
    today = datetime.date.today()
    userQuiz = UserQuizTable.objects.filter(user=user, date__range=[today - datetime.timedelta(days=5), today])
    
    serializer = UserQuizTableSerializer(userQuiz, many=True)

    count_dict = {}

    for i in serializer.data:
        if i['date'] in count_dict:
            count_dict[i['date']] += 1
        else:
            count_dict[i['date']] = 1

    return Response(count_dict)

@api_view(['GET'])
def getTopics(request):
    topics = TopicTable.objects.exclude(topic="Undefined")
    serializer = TopicTableSerializer(topics, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getQATopics(request):
    user = User.objects.get(username="zaid")

    userQuiz = UserQuizTable.objects.filter(user=user).order_by('-date')
    topics = {}
    for i in userQuiz:
        for j in i.qaTableObjects.all():
            if j.topic.topic in topics:
                topics[j.topic.topic] += 1
            else:
                topics[j.topic.topic] = 1

    topics.pop('Undefined')
    return Response(topics)

@api_view(['GET'])
def showStats(request):
    
    user = User.objects.get(username="zaid")
    # userStats = StatsTable.objects.get_or_create(user=user)
    # userStats[0].updateStats(user)
    serializer = StatsTableSerializer()
    print(request.user)
    return Response(serializer.data)

@api_view(['GET'])
def getContext(request, topic_id):
    context = ContextTable.objects.exclude(topic_id=18)
    context = context.filter(topic_id=topic_id)
    serializer = ContextTableSerializer(context, many=True)
    print(request.user)
    return Response(serializer.data)

@api_view(['POST'])
def UserSigninView(request):
    username = request.data['username']
    password = request.data['password']
    dum = {"username": "zaid", "password": "zaid"}

    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        print(token.key)
        print(request.user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response("User not found", status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def UserSignoutView(request):
    username = request.user
    logout(request)
    return Response(f"User {username} logged out", status=status.HTTP_200_OK)

