#!/usr/bin/env python3

import os
from datetime import date

from pymongo import MongoClient

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

client = MongoClient("mongodb://localhost:27017")
db = client.kctl

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

#print(client.database_names())

cursor = db.students.find({})
print("ok")
for document in cursor:
    print("wow")
    print(document)

with open(filename) as f:
    for i, line in enumerate(f):
        if i == 0:
            continue
        #print("line {0} = {1}".format(i, line.split(",")))
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
            print(student)
        except:
            print("FAILFAILFAIL")
            student = {
                "season": season,
                "program": program,
                "site": "over-10",
                "firstName": "Jonathan",
                "lastName": "Del Rosario"
            }
            print(student)
            print(line)

        try:
            db.students.insert(student)
        except:
            print("WRITEFAIL")
            print(student)
