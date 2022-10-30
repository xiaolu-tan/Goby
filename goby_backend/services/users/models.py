from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class WorkExperience(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=200,null=True)
    company = models.CharField(max_length=200,null=True)
    startdate = models.DateTimeField(auto_now_add=False,null=True)
    enddate = models.DateTimeField(auto_now_add=False,null=True)
    description = models.TextField(null=True)
    createtime=models.DateTimeField(auto_now_add=True)
    updatetime=models.DateTimeField(auto_now=True)

class Education(models.Model):
    id=models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    schoolName=models.CharField(max_length=200,null=True)
    startdate = models.DateTimeField(auto_now_add=False,null=True)
    enddate = models.DateTimeField(auto_now_add=False,null=True)
    degree = models.CharField(max_length=200,null=True)
    fieldOfStudy = description = models.TextField(null=True)
    description = models.TextField(null=True)
    createtime=models.DateTimeField(auto_now_add=True)
    updatetime=models.DateTimeField(auto_now=True)

class Project(models.Model):
    id=models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    projectName=models.CharField(max_length=200,null=True)
    startdate = models.DateTimeField(auto_now_add=False,null=True)
    enddate = models.DateTimeField(auto_now_add=False,null=True)
    description = models.TextField(null=True)
    createtime=models.DateTimeField(auto_now_add=True)
    updatetime=models.DateTimeField(auto_now=True)