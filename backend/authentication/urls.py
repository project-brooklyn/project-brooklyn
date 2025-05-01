from django.contrib import admin
from django.urls import path
from .views import TestView, LoginView, LogoutView, SignUpView

urlpatterns = [
    path('test/', TestView.as_view(), name='test'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('signup/', SignUpView.as_view(), name='signup'),
]
