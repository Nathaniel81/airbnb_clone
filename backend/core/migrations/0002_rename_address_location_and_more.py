# Generated by Django 5.0.6 on 2024-06-09 07:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Address',
            new_name='Location',
        ),
        migrations.RenameField(
            model_name='property',
            old_name='address',
            new_name='location',
        ),
    ]