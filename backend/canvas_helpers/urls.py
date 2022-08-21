from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("courses", views.courses_list),
    path("course/<int:courseid>/groups/categories", views.course_group_categories),
    path("course/<int:courseid>/assignments", views.course_assignments),
    path("course/<int:courseid>/assignments/csv", views.course_assignments_csv),
    path("course/<int:courseid>/qualtrics", views.course_qualtrics),
]
