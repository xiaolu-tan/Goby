'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-01 09:28:50
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-03 10:24:03
FilePath: /goby_api/userprofile/viewsets.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from . import models
from . import serializers

class JobViewset(viewsets.ModelViewSet):
 authentication_classes = [SessionAuthentication, BasicAuthentication]
 permission_classes = [IsAuthenticated]
 queryset = models.Jobs.objects.all()
 serializer_class = serializers.JobSerializer