#!/usr/bin/env python3

import os

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

with open(filename) as f:
    for i, line in enumerate(f):
        print("line {0} = {1}".format(i, line.split(",")))
        student = {
            "season": season,
            "program": program,
            # site
            "parentEmail": line[1],
            "firstName": line[2].split()[:-1],
            "lastName": line[2].split()[-1],
            # address
            "dob": line[4].replace("/", "-"),

        }
