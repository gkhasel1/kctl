#!/usr/bin/env python3

import os
from datetime import date

from MeteorClient import MeteorClient


filename = "2018-winter-students.csv"
season = "winter"
program = "after-school"
columns = [
    "Timestamp",
    "Email Address",
    "Child's Full Name",
    "Child's Address",
    "Child Date of Birth ",
    "Parent/Guardian Contact Name",
    "Parent/Guardian Phone Number",
    "Parent/Guardian Email Address",
    "Emergency Contact Name",
    "Emergency Phone Number",
    "Child's Uniform Size",
    "Does your child have any dietary restrictions?",
    "If your child has previously participated in KCTL, please identify his/her team."
]


client = MeteorClient('ws://127.0.0.1:80/websocket')
client.connect()


def calculate_age(year, month, day):
    today = date.today()
    return today.year - year - ((today.month, today.day) < (month, day))


def site_bucket(dob):
    print(dob)
    dob_l = dob.split("-")
    year = int(dob_l[2])
    month = int(dob_l[1])
    day = int(dob_l[0])
    age = calculate_age(year, month, day)
    if age < 10:
        return "under-10"
    elif age >= 10:
        return "over-10"


def remove_callback(error, data):
    if error:
        print(error)
        return
    print(data)


def new_student_callback(error, data):
    if error:
        print(error)
        return
    print(data)


def run():
    print("Running...")
    with open(filename) as f:
        for i, line in enumerate(f):

            # skip headers
            if i == 0:
                continue

            line = line.split("\t")

            try:
                student = {
                    "season": season,
                    "program": program,
                    "site": site_bucket(line[4].replace("/", "-")),
                    "parentEmail": line[1],
                    "firstName": " ".join(line[2].split()[:-1]),
                    "lastName": line[2].split()[-1],
                    "parentAddress": line[3],
                    "dob": line[4].replace("/", "-"),
                    "parentPrimaryPhone": line[6],
                    "emergencyName": line[8],
                    "emergencyPhone": line[9],
                    "uniform": line[10],
                    "allergy": line[11],
                    "previousParticipation": line[12]
                }
            except:
                print("Failed to Parse Data...")

                #this really only happens for this last line in the file...
                student = {
                    "season": season,
                    "program": program,
                    "site": "over-10",
                    "firstName": "Jonathan",
                    "lastName": "Del Rosario"
                }

        client.insert("students", student, callback=new_student_callback)


if __name__ == "__main__":
    print("Starting...")
    s = client.find_one('students')
    print(s)
    # client.remove("students", {}, callback=remove_callback)
    # client.remove("registrations", {}, callback=remove_callback)
    # client.remove("volunteers", {}, callback=remove_callback)
    # client.remove("attendance", {}, callback=remove_callback)
    # run()
