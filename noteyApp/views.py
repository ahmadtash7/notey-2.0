from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import QuestionAnswerTable, ContextTable, TopicTable, LeaderBoardTable, UserQuizTable
from django.contrib.auth.models import User
from .serializer import QuestionAnswerTableSerializer, ContextTableSerializer, TopicTableSerializer, LeaderBoardTableSerializer, UserQuizTableSerializer, UserSerializer
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect


# Create your views here.
# @api_view(['GET'])
# def getQA(request):
#     qa = QuestionAnswerTable.objects.all()
#     serializer = QuestionAnswerTableSerializer(qa, many=True)
#     return Response(serializer.data)


# @api_view(['GET'])
# def getUserName(request):
#     user = User.objects.filter(username="zaid")

#     serializer = UserSerializer(user, many=True)
#     return Response(serializer.data)

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
    userQuiz = UserQuizTable.objects.create(user=user, date="2021-08-16")
    userQuiz.qaTableObjects.set(random_qa)
    userQuiz.save()
    serializer = UserQuizTableSerializer(userQuiz)
    return Response(serializer.data)

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



