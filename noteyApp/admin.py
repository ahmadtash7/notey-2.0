# myapp/admin.py
from django.contrib import admin
from .models import ContextTable, TopicTable, QuestionAnswerTable, LeaderBoardTable, UserQuizTable

admin.site.register(TopicTable)
admin.site.register(ContextTable)
admin.site.register(QuestionAnswerTable)
admin.site.register(LeaderBoardTable)
admin.site.register(UserQuizTable)
