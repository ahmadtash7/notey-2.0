from django.db import models
from django.contrib.auth.models import User



class TopicTable(models.Model):
    topic = models.TextField()
    

    def __str__(self):
        return f"Topic: {self.topic}"


class ContextTable(models.Model):
    
    context = models.TextField()
    topic = models.ForeignKey(TopicTable, on_delete=models.CASCADE)

    def __str__(self):
        return f"Context: {self.context}, Topic: {self.topic}"
 

class QuestionAnswerTable(models.Model):

    question = models.TextField()
    answer = models.TextField()
    distractors = models.JSONField()
    topic = models.ForeignKey(TopicTable, on_delete=models.CASCADE)

    def __str__(self):
        return f"Question: {self.question}, Answer: {self.answer}, Distractors: {self.distractors}, Topic: {self.topic}"

class LeaderBoardTable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    
    def __str__(self):
        return f"User: {self.user}, Score: {self.score}"

class UserQuizTable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    date = models.DateField()

    qaTableObjects = models.ManyToManyField(QuestionAnswerTable)


        
        

    def __str__(self):
        return f"User: {self.user}, Date: {self.date}, QA: {self.qaTableObjects.all()}"