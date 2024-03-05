from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import QuestionAnswerTable, ContextTable, TopicTable, LeaderBoardTable, UserQuizTable, StatsTable
from django.contrib.auth.models import User
from .serializer import QuestionAnswerTableSerializer, ContextTableSerializer, TopicTableSerializer, LeaderBoardTableSerializer, UserQuizTableSerializer, UserSerializer, StatsTableSerializer
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect, HttpResponse



@api_view(['GET'])
def dashboard(request):
    user = User.objects.filter(username="zaid")
    
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def createQuiz(request, num_questions=5):
    user = User.objects.get(username="zaid")
    qa = QuestionAnswerTable.objects.all()
    random_qa = qa.order_by('?')[:num_questions]
    userQuiz = UserQuizTable.objects.create(user=user, date="2021-08-16",userAnswers = {})
    userQuiz.qaTableObjects.set(random_qa)

    answers = {}

    # populate answers dictionary
    for index,i in enumerate(random_qa):
        # answers[i.question] = i.answer
        answers[i.question] = ''
    userQuiz.userAnswers = answers

    userQuiz.save()

    userStats = StatsTable.objects.get_or_create(user=user)
    print(userStats[0])
    userStats[0].updateStats(user)

    
    # userStats.updateStats(user)

    serializer = UserQuizTableSerializer(userQuiz)
    return Response(serializer.data)



def updateStatsView(request):
    user = User.objects.get(username="zaid")
    userStats = StatsTable.objects.get_or_create(user=user)
    userStats[0].updateStats(user)

    response = HttpResponse("Stats updated", content_type="text/plain")
    return response


@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard')  # Replace 'dashboard' with the URL name of your dashboard view
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})


    
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data['username']
        password = request.data['password']

        user = User.objects.get(username=username)
        if user.check_password(password):
            login(request, user)

            return Response("Login Successful")
        else:
            return Response("Login Failed")


@api_view(['GET'])
def getTopics(request):
    topics = TopicTable.objects.all()
    serializer = TopicTableSerializer(topics, many=True)
    return Response(serializer.data)



