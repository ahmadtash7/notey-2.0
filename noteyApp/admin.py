# myapp/admin.py
from django.contrib import admin
from .models import ContextTable, TopicTable

admin.site.register(TopicTable)
admin.site.register(ContextTable)
