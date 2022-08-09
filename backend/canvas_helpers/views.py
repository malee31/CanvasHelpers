from os import environ
from pathlib import Path
import sys
import json

from canvasapi import Canvas

from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from django.conf import settings

# TODO: do we want to allow for changing the base api url at some point?
# if so, this would need to be reworked
BASE_URL = "https://canvas.ucdavis.edu/"

# Create your views here.
def index(request):
    return render(request, "canvas_helpers/index.html")


def courses_list(request: HttpRequest):
    canvas = get_canvas(request)
    # TODO add error handling
    courses = canvas.get_current_user().get_courses()
    with_name = filter(lambda course: hasattr(course, "name"), courses)
    output = [{"name": course.name, "id": course.id} for course in with_name]
    # TODO finalize this: we could also wrap it in a dict, but the "safe"
    # keyword appears to be as a result of a historical vulnerability with ECMAscript
    return JsonResponse(output, safe=False)  # Needed to return a raw array


def course_group_categories(request: HttpRequest, courseid: int):
    canvas = get_canvas(request)
    course = canvas.get_course(courseid)
    group_cats = course.get_group_categories()
    with_name = filter(lambda category: hasattr(category, "name"), group_cats)
    output = [{"name": category.name, "id": category.id} for category in with_name]
    return JsonResponse(output, safe=False)


def get_canvas(request: HttpRequest):
    if "Canvas-Token" in request.headers:
        api_token = request.headers.get("Canvas-Auth-Token")
    else:
        api_token = _get_token_from_env()
        if not api_token:
            print("API KEY NOT FOUND", sys.stderr)  # TODO: proper logging
    return Canvas(BASE_URL, api_token)


def _get_token_from_env() -> str:
    api_token = environ.get("CANVAS_API_KEY")
    if not api_token:
        print(settings.BASE_DIR)
        token_file = Path(settings.BASE_DIR).parent / "canvas_token.txt"
        if token_file.exists():
            api_token = token_file.open().read().strip()
        else:
            api_token = ""
    return api_token
