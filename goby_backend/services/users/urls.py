'''
Author: Xiaolu xiaolutan@apexglobe.com
Date: 2022-10-08 15:56:27
LastEditors: Xiaolu xiaolutan@apexglobe.com
LastEditTime: 2022-11-11 05:54:30
FilePath: /goby_backend/services/users/urls.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''

from django.urls import path, re_path
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView,ConfirmEmailView
from dj_rest_auth.views import LoginView, LogoutView
from .views import WorkExperienceList,WorkExperienceDetail,EducationList,EducationDetail,ProjectList,ProjectDetail

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),

    path('verify-email/',
         VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/',
         VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
         VerifyEmailView.as_view(), name='account_confirm_email'),
    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),

    path('profile/experience', WorkExperienceList.as_view()),
    path('profile/experience/<int:pk>', WorkExperienceDetail.as_view()),

    path('profile/education', EducationList.as_view()),
    path('profile/education/<int:pk>', EducationDetail.as_view()),

    path('profile/project', ProjectList.as_view()),
    path('profile/project/<int:pk>', ProjectDetail.as_view()),
]
