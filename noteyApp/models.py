from django.db import models




class TopicTable(models.Model):
    topic = models.TextField()
    

    def __str__(self):
        return f"Topic: {self.topic}"


class ContextTable(models.Model):
    
    context = models.TextField()
    topic = models.ForeignKey(TopicTable, on_delete=models.CASCADE)

    def __str__(self):
        return f"Context: {self.context}, Topic: {self.topic}"
