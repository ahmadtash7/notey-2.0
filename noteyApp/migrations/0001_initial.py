# Generated by Django 5.0.2 on 2024-02-23 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ContextTable",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("context", models.TextField()),
                ("topic_id", models.IntegerField()),
            ],
        ),
    ]
