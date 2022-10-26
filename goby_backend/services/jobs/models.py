'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-08 15:31:20
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-09 09:26:30
FilePath: /goby_backend/services/jobs/models.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from django.db import models

# Create your models here.
class Jobs(models.Model):
    
    title = models.CharField(max_length=200, blank=True, default='')
    description = models.TextField(max_length=2000, blank=True)
    location = models.CharField(max_length=30, blank=True)
    end_date = models.DateField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    # owner = models.ForeignKey('auth.User', related_name='jobs', on_delete=models.CASCADE)
    def __str__(self):
        return self.title