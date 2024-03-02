from rest_framework import serializers
from .models import QuestionAnswerTable, ContextTable, TopicTable, LeaderBoardTable, UserQuizTable
from django.contrib.auth.models import User



class QuestionAnswerTableSerializer(serializers.ModelSerializer):
    class Meta:
        model=QuestionAnswerTable
        fields='__all__'


class ContextTableSerializer(serializers.ModelSerializer):
    class Meta:
        model=ContextTable
        fields='__all__'


class TopicTableSerializer(serializers.ModelSerializer):
    class Meta:
        model=TopicTable
        fields='__all__'


class LeaderBoardTableSerializer(serializers.ModelSerializer):
    class Meta:
        model=LeaderBoardTable
        fields='__all__'


class UserQuizTableSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserQuizTable
        fields='__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'