import { Students } from '/imports/api/students/students.js';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';
import { Attendance } from '/imports/api/attendance/attendance.js';
import { Registrations } from '/imports/api/registrations/registrations.js';
import { Meteor } from 'meteor/meteor';

import './data.html';

Template.kctldata.onCreated(function () {
  Meteor.subscribe('students.all');
  Meteor.subscribe('volunteers.all');
  Meteor.subscribe('attendance.all');
  Meteor.subscribe('registrations.all');
});

Template.kctldata.helpers({
  students() {
    return Students.find({});
  },
  volunteers() {
    return Volunteers.find({});
  },
  registrations() {
    return Registrations.find({});
  },
  attendance() {
    return Attendance.find({});
  },
});
