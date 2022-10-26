'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-02 10:28:24
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-03 10:45:23
FilePath: /goby_api/jobs/views.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from django.shortcuts import render

# Create your views here.
from .models import Jobs
from .serializers import JobSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from jobs import serializers

class JobList(APIView):
 def get(self, request, format=None):
  jobs = Jobs.objects.all()
  serializer = JobSerializer(jobs, many=True)
  return Response(serializer.data)

 def post(self, request, format=None):
  serializer = SnippetSerializer(data=request.data)
  if serializer.is_valid():
   serializer.save()
   return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from .models import Jobs
from .serializers import JobSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class JobDetail(APIView):
 def get_object(self,pk):
  try:
   return Jobs.objects.get(pk=pk)
  except Jobs.DoesNotExist:
   raise Http404

 def get(self, request, pk, format=None):
  job=self.get_object(pk)
  serializer = JobSerializer(job)
  return Response(serializer.data)
 
 def put(self,request,pk,format=None):
  job=self.get_object(pk)
  serializer = JobSerializer(job,data=request.data)
  if(serializer.is_valide()):
   serializer.save()
   return Response(serializer.data)
  return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

 def delete(self,request,pk,format=None):
  job=self.get_object(pk)
  job.delete()
  return Response(status=status.HTTP_204_NO_CONTENT)
  