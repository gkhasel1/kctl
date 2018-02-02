import { Meteor } from 'meteor/meteor';
import { Attendance } from '../attendance.js';

Meteor.publish('attendance.all', function () {
  return Attendance.find({});
});

Meteor.publish('attendance.date', function (season, program, site) {
  return Attendance.find({
    season: season,
    program: program,
    site: site,
    date: new Date().toDateString()
  });
});
