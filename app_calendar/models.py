from django.db import models

# Create your models here.
class Appointment(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    date = models.DateField()
    time_from = models.TimeField()
    time_to = models.TimeField()
    description = models.TextField(max_length=250, null=True, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    closed = models.BooleanField(default=False)
    created_user = models.CharField(max_length=50, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_user = models.CharField(max_length=50, null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['date', 'time_from', 'name']
        constraints = [
            models.UniqueConstraint(fields=['name', 'date'], name='unique calendar rule')
        ]

    def __str__(self) -> str:
        return f"{self.name} ({self.date})"
