import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Attendance = new Mongo.Collection('attendance');

Attendance.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const AttendanceSchema = new SimpleSchema({
  date: {
    type: String,
    label: "Date",
    max: 25,
  },
  studentIds: {
    type: [String],
    label: "Student Ids",
  },
  volunteerIds: {
    type: [String],
    label: "Volunteer Ids",
  },
  court: {
    type: String,
    label: "Court",
  },
  createdAt: {
    type: Date,
    label: "Datetime that attendance was created",
  },
});
