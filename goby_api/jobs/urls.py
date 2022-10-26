'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-03 10:34:06
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-03 10:56:10
FilePath: /goby_api/jobs/urls.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from jobs import views

urlpatterns = [
 re_path(r'^jobs/$', views.JobList.as_view()),
 re_path(r'^jobs/(?P<pk>[0-9]+)/$', views.JobDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)