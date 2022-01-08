from django.contrib import admin
from .models import Appointment

def appointment_oeffnen(modeladmin, request, queryset):
    queryset.update(closed=False)

def appointment_schliessen(modeladmin, request, queryset):
    queryset.update(closed=True)

class AppointmentPlus(admin.ModelAdmin):
    list_display = ('name', 'date', 'time_from', 'time_to', 'closed')
    list_filter = ('closed', )
    actions = [appointment_oeffnen, appointment_schliessen]

# Register your models here.
admin.site.register(Appointment, AppointmentPlus)
