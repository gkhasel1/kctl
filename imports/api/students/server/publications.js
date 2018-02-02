import { Meteor } from 'meteor/meteor';
import { Students } from '../students.js';

Meteor.publish('students.all', function () {
  return Students.find({});
});

Meteor.publish('students.court', function (season, program, site) {
  return Students.find({
    season: season,
    program: program,
    site: site
  });
});
