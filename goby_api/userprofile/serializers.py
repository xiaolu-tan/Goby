'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-01 08:22:25
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-01 09:51:01
FilePath: /goby_api/userprofile/serializersu.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from dataclasses import field
from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
 class Meta:
  model=Profile
  fields='__all__'