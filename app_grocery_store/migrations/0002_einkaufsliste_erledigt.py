# Generated by Django 4.0.1 on 2022-01-19 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_grocery_store', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='einkaufsliste',
            name='erledigt',
            field=models.BooleanField(default=False),
        ),
    ]
