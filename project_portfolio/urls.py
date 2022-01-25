"""project_portfolio URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app-3d-world/', include('app_3d_world.urls')),
    path('app-calculator/', include('app_calculator.urls')),
    path('app-calendar/', include('app_calendar.urls')),
    path('app-ecommerce/', include('app_ecommerce.urls')),
    path('app-game/', include('app_game.urls')),
    path('app-grocery-store/', include('app_grocery_store.urls')),
    path('app-todo/', include('app_todo.urls')),
    path('app-weather/', include('app_weather.urls')),
    path('', include('frontend.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)