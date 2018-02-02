import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Attendance, AttendanceSchema } from './attendance.js';

Attendance._ensureIndex({date: 1, court: 1}, {unique: 1});

Meteor.methods({
  'attendance.upsert'(season, program, site, studentIds, volunteerIds) {
    var data = {
      studentIds: studentIds,
      volunteerIds: volunteerIds,
      season: season,
      program: program,
      site: site,
      date: new Date().toDateString(),
      createdAt: new Date(),
    };

    check(data, AttendanceSchema);

    return Attendance.upsert(
      {
        date: new Date().toDateString(),
        season: season,
        program: program,
        site: site,
      },
      {
        $set: data,
      }
    );
  },
  'attendance.today'(season, program, site) {
    return Attendance.findOne({
      date: new Date().toDateString(),
      season: season,
      program: program,
      site: site
    });
  },
});
