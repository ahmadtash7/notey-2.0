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
    qa = QuestionAnswerTable.objects.all()
    random_qa = qa.order_by('?')[:num_questions]
    userQuiz = UserQuizTable.objects.create(
        user=user, date="2021-08-16", userAnswers={})
    userQuiz.qaTableObjects.set(random_qa)
    print(userQuiz.qaTableObjects.all())
    answers = {}

    # populate answers dictionary
    for index, i in enumerate(random_qa):
        # answers[i.question] = i.answer
        answers[i.question] = ''
    userQuiz.userAnswers = answers
    print(userQuiz)
    userQuiz.save()

    userStats = StatsTable.objects.get_or_create(user=user)
    print(userStats[0])
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

# class UserLogin(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = (SessionAuthentication, )

#     def post(self, request):
#         data = request.data
#         # print(data)
#         # assert 'username' in data, 'username is required'
#         # assert validate_password(data['password']), 'password is required'

#         serializer = UserLoginSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.check_user(data)
#             login(request, user)
#             token, created = Token.objects.get_or_create(user=user)

#             print(token.key)
#             return Response({'data':serializer.data,'token':token.key},status=status.HTTP_200_OK)


# class UserRegistration(APIView):
#     permission_classes = (permissions.AllowAny,)
#     # {"email":"ziz@gmail.com", "username":"zizizizi","password":"Rizz2010"}

#     def post(self, request):
#         data = request.data

#         serializer = UserRegisterSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.create(data)
#             if user:
#                 return Response(serializer.data ,status=status.HTTP_201_CREATED)

#         return Response( status=status.HTTP_400_BAD_REQUEST)


# class UserLogout(APIView):
#     def post(self, request):
#         logout(request)
#         return Response(status=status.HTTP_200_OK)


# class UserView(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     authentication_classes = (SessionAuthentication,)


#     def get(self, request):
#         user = request.user
#         serializer = UserSerializer(user)
#         return Response({'user':serializer.data}, status=status.HTTP_200_OK)
