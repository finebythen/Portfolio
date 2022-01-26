from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.
class Einkaufsliste(models.Model):
    beschreibung = models.CharField(max_length=50, null=False, blank=False, unique=True)
    anzahl = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    erledigt = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['erledigt', 'beschreibung']

    def __str__(self) -> str:
        return self.beschreibung