from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('callback/', views.KindeCallbackView.as_view(), name='callback'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('favorites/', views.UserFavoritesView.as_view(), name='favorites'),
    path('properties/', views.UserPropertiesList.as_view(), name='my-properties'),
    path('reservations/', views.UserReservationsAPIView.as_view(), name='my-reservations'),
]
