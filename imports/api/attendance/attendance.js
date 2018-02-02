import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Attendance = new Mongo.Collection('attendance');

Attendance.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const AttendanceSchema = new SimpleSchema({
  season: {
    label: "Season.",
    type: String,
  },
  program: {
    label: "Program.",
    type: String,
  },
  site: {
    label: "Site.",
    type: String,
  },
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
  createdAt: {
    type: Date,
    label: "Datetime that attendance was created",
  },
});
