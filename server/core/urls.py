from django.contrib import admin
from django.urls import path, include
from user.views import get_ethereum_balance

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('user.urls', namespace='user')),
    path(
        "api/get-ethereum-balance/", get_ethereum_balance, name="get-ethereum-balance"
    ),
]
