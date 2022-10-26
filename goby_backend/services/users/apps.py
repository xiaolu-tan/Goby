'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-08 15:55:45
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-08 15:59:54
FilePath: /goby_backend/services/users/apps.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'services.users'
