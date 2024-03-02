from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import QuestionAnswerTable, ContextTable, TopicTable, LeaderBoardTable, UserQuizTable
from django.contrib.auth.models import User
from .serializer import QuestionAnswerTableSerializer, ContextTableSerializer, TopicTableSerializer, LeaderBoardTableSerializer, UserQuizTableSerializer, UserSerializer


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

