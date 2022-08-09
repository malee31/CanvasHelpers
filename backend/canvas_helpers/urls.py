from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("courses", views.courses_list),
    path("course/<int:courseid>/groups/categories", views.course_group_categories)
]
