import { Meteor } from 'meteor/meteor';
import { Students } from '../students.js';

Meteor.publish('students.all', function () {
  return Students.find({});
});

Meteor.publish('students.court', function (court) {
  return Students.find({court: court});
});
