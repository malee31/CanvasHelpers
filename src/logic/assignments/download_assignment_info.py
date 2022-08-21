import csv

import canvasapi

def download_assignment_info(course: canvasapi.course.Course, path_to_csv: str, skip_limit: int = 50):
    with open(path_to_csv, mode='w', newline='') as csv_file:
        assignment_info_to_file(course, csv_file, skip_limit)

def assignment_info_to_file(course: canvasapi.course.Course, file, skip_limit: int = 50):
    """Uses a csv writer to write assignment information from `course` to `file`

    `file` must implement the `write()` method.
    """
    writer = csv.writer(file)
    for assignment_group in course.get_assignment_groups(include=['assignments']):
        writer.writerow([assignment_group.name, assignment_group.id, ''])
        if len(assignment_group.assignments) < skip_limit:
            for assignment in assignment_group.assignments:
                writer.writerow(['', assignment['name'], assignment['id']])
            writer.writerow([])
