from rest_framework import serializers
from .models import QuestionAnswerTable, ContextTable, TopicTable, LeaderBoardTable, UserQuizTable, StatsTable
from django.contrib.auth.models import User
from django.contrib.auth import authenticate



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




class StatsTableSerializer(serializers.ModelSerializer):
    class Meta:
        model=StatsTable
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username', 'email')

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'
        
   
    def create(self, clean_data):
        user = User.objects.create_user(username=clean_data['username'], password=clean_data['password'], email=clean_data['email'])
        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    # email = serializers.EmailField()
    password = serializers.CharField()
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], 
        password=clean_data['password'],
        )
        if not user:
            raise serializers.ValidationError('Invalid username or password')