'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-08 15:52:48
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-08 15:53:34
FilePath: /goby_backend/services/jobs/urls.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from django.urls import path
from .views import JobsList, JobsDetail

urlpatterns = [
    path('', JobsList.as_view()),
    path('<int:pk>', JobsDetail.as_view()),
]