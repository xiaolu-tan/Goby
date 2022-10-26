'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-01 09:43:23
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-03 10:15:45
FilePath: /goby_api/goby_api/router.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from userprofile.viewsets import ProfileViewset
from jobs.viewsets import JobViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register('profile',ProfileViewset)
router.register('job',JobViewset)