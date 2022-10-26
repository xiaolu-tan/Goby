'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-08 15:46:40
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-08 15:50:17
FilePath: /goby_backend/services/jobs/serializers.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from rest_framework import serializers
from .models import Jobs


class JobsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Jobs
        fields = ('pk', 'title', 'description', 'location', 'end_date','created','updated')
