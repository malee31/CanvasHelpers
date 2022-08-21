from os import environ
from pathlib import Path
import sys
import io

from canvasapi import Canvas
from django.shortcuts import render
from django.http import HttpRequest, JsonResponse, HttpResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

from . import utils

# TODO: do we want to allow for changing the base api url at some point?
# if so, this would need to be reworked
BASE_URL = "https://canvas.ucdavis.edu/"

# Create your views here.
def index(request):
    return render(request, "canvas_helpers/index.html")


@csrf_exempt
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


# TODO: check to see what we actually want from this endpoint --- csv seems unweildy for front end
def course_assignments(request: HttpRequest, courseid: int):
    canvas = get_canvas(request)
    course = canvas.get_course(courseid)
    assignments = course.get_assignments()
    assignment_groups = {g.id: g.name for g in course.get_assignment_groups()}
    output = [
        {
            "name": assign.name,
            "id": assign.id,
            "group": assign.assignment_group_id,
            "group_position": assign.position,
            "group_name": assignment_groups[assign.assignment_group_id],
        }
        for assign in assignments
    ]
    return JsonResponse(output, safe=False)


def course_assignments_csv(request: HttpRequest, courseid: int):
    canvas = get_canvas(request)
    course = canvas.get_course(courseid)
    response = HttpResponse(
        content_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="assignment_info.csv"'},
    )
    limit: int = request.GET.get("skip_limit")

    if limit is not None:
        utils.logic.assignments.download_assignment_info.assignment_info_to_file(
            course, response, limit
        )
    else:
        utils.logic.assignments.download_assignment_info.assignment_info_to_file(course, response)
    return response


@csrf_exempt
def course_qualtrics(request: HttpRequest, courseid: int):
    canvas = get_canvas(request)
    course = canvas.get_course(courseid)
    students = course.get_users(enrollment_type="student")
    result = utils.logic.qualtrics.get_missing_qualtrics_users_from_contents(
        students, request.body.split("\n")
    )
    missing_from_qualtrics = [
        {
            "email": user.email,
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
        for user in result[0]
    ]

    missing_from_canvas = [user._asdict() for user in result[1]]
    return JsonResponse([missing_from_qualtrics, missing_from_canvas])


def get_canvas(request: HttpRequest):
    if "Authorization" in request.headers:
        api_token: str = request.headers.get("Authorization")
        if api_token.startswith("Bearer ") and len(api_token) > 7:
            api_token = api_token[7:]
        else:
            api_token = ""  # Improperly formatted Authorization header
    else:
        api_token = _get_token_from_env()
        if not api_token:
            print("API KEY NOT FOUND", sys.stderr)  # TODO: proper logging
    return Canvas(BASE_URL, api_token)


def _get_token_from_env() -> str:
    api_token = environ.get("CANVAS_API_KEY")
    if not api_token:
        token_file = Path(settings.BASE_DIR).parent / "canvas_token.txt"
        if token_file.exists():
            api_token = token_file.open().read().strip()
        else:
            api_token = ""
    return api_token
