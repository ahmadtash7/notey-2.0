from rest_framework import serializers
from .models import QuestionAnswerTable, ContextTable, TopicTable, LeaderBoardTable, UserQuizTable, StatsTable
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


class StatsTableSerializer(serializers.ModelSerializer):
    class Meta:
        model=StatsTable
        fields='__all__'



class UserAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password']
        extra_kwargs={'password':{'write_only':True,'required':True}}


    def create(self,validated_data):
        user=User.objects.create_user(**validated_data)
        user.is_staff = False
        user.is_superuser = False
        user.save()
        return user