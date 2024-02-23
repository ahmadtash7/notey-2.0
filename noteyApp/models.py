from django.db import models


class TopicTable(models.Model):
    topic = models.TextField()
    topic_id = models.AutoField(primary_key=True, default=0)

    def __str__(self):
        return f"Topic: {self.topic}"


class ContextTable(models.Model):
    # index = models.AutoField(primary_key=True)
    context = models.TextField()
    topic_id = models.ForeignKey(TopicTable, on_delete=models.CASCADE)

    def __str__(self):
        return f"Context: {self.context}, Topic: {self.topic}"
