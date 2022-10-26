'''
Author: Xiaolu Tan xiaolutan@apexglobe.com
Date: 2022-10-01 01:01:48
LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
LastEditTime: 2022-10-07 08:55:53
FilePath: /goby_api/accounts/urls.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from knox import views as knox_views
from .views import RegisterAPI,LoginAPI,ExampleView,ChangePasswordView, get_user_data
from django.urls import path,include
from . import views

urlpatterns = [
    path('api/register', RegisterAPI.as_view(), name='register'),
    # path('api/login', LoginAPI.as_view(), name='login'),
    path('api/getuser', ExampleView.as_view(), name='login'),
    path('api/logout', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/change-password', ChangePasswordView.as_view(), name='change-password'),
    path('api/password_reset', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/login',views.login_api),
    path('api/user',views.get_user_data),
]