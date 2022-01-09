from django.contrib import admin
from .models import Appointment

class AppointmentPlus(admin.ModelAdmin):
    list_display = ('name', 'date', 'time_from', 'time_to')

# Register your models here.
admin.site.register(Appointment, AppointmentPlus)
