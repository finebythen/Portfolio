from django.db import models

# Create your models here.
class Task(models.Model):
    description = models.CharField(max_length=100, null=False, blank=False, unique=True)
    closed = models.BooleanField(default=False)
    created_user = models.CharField(max_length=50, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['description']

    def __str__(self) -> str:
        return self.description
