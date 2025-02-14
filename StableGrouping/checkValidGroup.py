""" This file has 2 functions: invalidGroupDict and isValidGroup.
invalidGroupDict returns a dictionary. This function only needs to be run once.
isValidGroup takes in that dictionary (and a list of student objects) and returns the count of how mamy times students have overlapped with each other
    """

# import system variables
# in order to send the messages, need canvas api key
# i put the api key in environment variables

from canvasapi import Canvas

from studentClass import Student

def invalidGroupDict(canvas: Canvas, course_number: int):
    """
    return a dictionary where the keys are STRING student id numbers, and the values are INT group numbers
    """
    course = canvas.get_course(course_number)

    # get a list of group categories
    group_cat_list = course.get_group_categories()
    
    studentid_groupid = {}

    all_students = course.get_users()
    for student in all_students:
        studentid_groupid[str(student.id)] = []

    # add in the one student from ecs 36a who for some reason does not get pulled
    if course_number == 516271:
        studentid_groupid["157307"] = []
        studentid_groupid["230430"] = []
    elif course_number == 546554:
        studentid_groupid["207234"] = []

    for group_cat in group_cat_list:
        group_list = group_cat.get_groups()
        for group in group_list:
            users_list = group.get_users()
            for j in users_list:
                studentid_groupid[str(j.id)].append(group.id)


    return studentid_groupid

def isValidGroup(invalid_group_dict: dict, student_list: list):
    """
    takes in a dictionary where the keys are STRING student id numbers, and the values are INT group numbers
    takes in a list of student objects
    returns an int (the number of times students have ever been in a same group before)
    """
    count = 0
    for student in student_list:
        student_id = str(student.idNum)
        prevMembers = invalid_group_dict[student_id]
        for other_student in student_list:
            other_student_id = str(other_student.idNum)
            if student_id != other_student_id:
                other_prevMembers = invalid_group_dict[other_student_id]
                sameGroup = set(prevMembers) & set(other_prevMembers)
                if sameGroup:
                    count += 1
    
    return count
