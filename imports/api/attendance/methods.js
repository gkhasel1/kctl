// Methods related to attendance

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Attendance, AttendanceSchema } from './attendance.js';

Attendance._ensureIndex({date: 1, court: 1}, {unique: 1});

Meteor.methods({
  'attendance.upsert'(court, studentIds) {
    var data = {
      studentIds: studentIds,
      court: court,
      date: new Date().toDateString(),
      createdAt: new Date(),
    };

    check(data, AttendanceSchema);

    return Attendance.upsert(
      { date: new Date().toDateString(), },
      { $set: data, });
  },
  'attendance.today'(court) {
    check(court, String);

    return Attendance.findOne({
      date: new Date().toDateString(),
      court: court,
    });
  },
});
