// All student-related publications

import { Meteor } from 'meteor/meteor';
import { Students } from '../students.js';

Meteor.publish('students.all', function () {
  return Students.find({});
});
Meteor.publish('students.court', function (courtName) {
  return Students.find({court: courtName});
});
