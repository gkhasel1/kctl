// Methods related to attendance

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Attendance } from './attendance.js';

Attendance._ensureIndex({date: 1}, {unique: 1});

Meteor.methods({
  'attendance.upsert'(studentIds) {
    check(studentIds, [String]);
    return Attendance.upsert(
    {
      date: new Date().toDateString(),
    },
    {
      $set: {
        studentIds,
        date: new Date().toDateString(),
        createdAt: new Date(),
      }
    });
  },
});
