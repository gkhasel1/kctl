// All student-related publications

import { Meteor } from 'meteor/meteor';
import { Students } from '../students.js';

Meteor.publish('students.all', function () {
  return Students.find({});
});
