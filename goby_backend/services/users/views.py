
from django.shortcuts import render

# Create your views here.
from .models import WorkExperience,Education,Project
from rest_framework.generics import ListCreateAPIView,  RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import WorkExperienceSerializer,EducationSerializer,ProjectSerializer

class WorkExperienceList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer

    # def get(self, request, *args, **kwargs):
    #    print(self.request.query_params.get('userid', None)) 
    def get_queryset(self):
        userid = self.request.query_params.get("userid", None)
        if userid:
            weResult = WorkExperience.objects.raw('select * from users_workexperience where user_id ='+userid)
            return weResult
        

class WorkExperienceDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer


class EducationList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

    # def get(self, request, *args, **kwargs):
    #    print(self.request.query_params.get('userid', None)) 
    def get_queryset(self):
        userid = self.request.query_params.get("userid", None)
        if userid:
            eResult = Education.objects.raw('select * from users_Education where user_id ='+userid)
            return eResult
        

class EducationDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class ProjectList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    # def get(self, request, *args, **kwargs):
    #    print(self.request.query_params.get('userid', None)) 
    def get_queryset(self):
        userid = self.request.query_params.get("userid", None)
        if userid:
            pResult = Project.objects.raw('select * from users_project where user_id ='+userid)
            return pResult
        

class ProjectDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
