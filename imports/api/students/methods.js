// Methods related to students

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Students } from './students.js';

Meteor.methods({
  'students.insert'(firstName, lastName) {
    check(firstName, String);
    check(lastName, String);

    return Students.insert({
      firstName,
      lastName,
      createdAt: new Date(),
    });
  },
});
