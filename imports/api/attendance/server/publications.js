import { Meteor } from 'meteor/meteor';
import { Attendance } from '../attendance.js';

Meteor.publish('attendance.all', function () {
  return Attendance.find({});
});
