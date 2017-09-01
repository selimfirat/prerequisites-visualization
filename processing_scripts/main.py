from infix_to_prefix import convert_infix_to_prefix
from possible_paths import get_possible_paths
import json


def process_courses(file_name):
    with open(file_name, 'r') as json_file:
        departments = json.load(json_file)

        for key in departments:
            for course in departments[key]["courses"]:
                prereq = course["prerequisite"]
                prereq_prefix = convert_infix_to_prefix(prereq)
                possible_paths = get_possible_paths(prereq_prefix)
                course["prerequisite_possible_paths"] = possible_paths

    return departments


def save_as_json(file_name, data):
    with open(file_name, 'w') as outfile:
        json.dump(data, outfile)
        print(file_name + " have successfully created.")


final_data = process_courses(file_name="../data/departments_original.json")
save_as_json(file_name="../data/departments.json", data=final_data)