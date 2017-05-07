// All student-related publications

import { Meteor } from 'meteor/meteor';
import { Attendance } from '../attendance.js';

Meteor.publish('attendance.all', function () {
  return Attendance.find({});
});

Meteor.publish('attendance.date', function () {
  return Attendance.find({date: new Date().toDateString()});
});
