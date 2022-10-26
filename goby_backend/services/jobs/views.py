'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-08 15:31:20
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-08 15:52:04
FilePath: /goby_backend/services/jobs/views.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from django.shortcuts import render

# Create your views here.
from .models import Jobs
from rest_framework.generics import ListCreateAPIView,  RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import JobsSerializer

class JobsList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer

class JobsDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer