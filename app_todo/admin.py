from django.contrib import admin
from django.db.models import query
from .models import Task

def task_schliessen(modeladmin, request, queryset):
    queryset.update(closed=True)

def task_oeffnen(modeladmin, request, queryset):
    queryset.update(closed=False)


class TaskPlus(admin.ModelAdmin):
    list_display = ('description', 'closed', 'created_user', 'created_date', 'updated_date')
    list_filter = ('closed', )
    actions = [task_schliessen, task_oeffnen]


# Register your models here.
admin.site.register(Task, TaskPlus)
