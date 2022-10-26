'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-01 07:53:38
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-01 08:00:04
FilePath: /goby_api/userprofile/admin.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from django.contrib import admin

# Register your models here.
from .models import Profile

admin.site.register(Profile)