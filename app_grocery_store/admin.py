from django.contrib import admin
from .models import Einkaufsliste

class EinkaufslistePlus(admin.ModelAdmin):
    list_display = ('beschreibung', 'anzahl', 'erledigt')

# Register your models here.
admin.site.register(Einkaufsliste, EinkaufslistePlus)
