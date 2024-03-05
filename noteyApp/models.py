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

    userAnswers = models.JSONField()


        
        

    def __str__(self):
        return f"User: {self.user}, Date: {self.date}, QA: {self.qaTableObjects.all()}, {self.userAnswers}"


class StatsTable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quizzesTaken = models.IntegerField(default = 0)
    questionsAttempted = models.IntegerField(default = 0)
    questionsCorrect = models.IntegerField(default = 0)

    def updateStats(self, user):
        self.user = user
        self.quizzesTaken = UserQuizTable.objects.filter(user=user).count() 
        
        userQuizObjects = UserQuizTable.objects.filter(user=user)

        self.questionsAttempted = 0

        for i in userQuizObjects:
            self.questionsAttempted += i.qaTableObjects.count()

        self.questionsCorrect = 0

        for i in userQuizObjects:
            userAnswers = i.userAnswers
            qaObjects = i.qaTableObjects.all()
            
            for j in range(len(qaObjects)):
                
                if userAnswers[qaObjects[j].question] == qaObjects[j].answer:
                    self.questionsCorrect += 1
        
        self.save()

    def __str__(self):
        return f"User: {self.user}, Quizzes Taken: {self.quizzesTaken}, Questions Attempted: {self.questionsAttempted}, Questions Correct: {self.questionsCorrect}"