from rest_framework import serializers
from .models import WorkExperience,Education,Project


class WorkExperienceSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkExperience
        fields = ('id', 'user', 'title', 'company', 'startdate','enddate','description')


class EducationSerializer(serializers.ModelSerializer):

     class Meta:
        model = Education
        fields = ('id', 'user', 'schoolName', 'degree','fieldOfStudy', 'startdate','enddate','description')

class ProjectSerializer(serializers.ModelSerializer):

     class Meta:
        model = Project
        fields = ('id', 'user', 'projectName', 'startdate','enddate','description')