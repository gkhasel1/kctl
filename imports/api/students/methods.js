// Methods related to students

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Students } from './students.js';

Meteor.methods({
  'students.insert'(firstName, lastName, court, registeredAt) {
    check(firstName, String);
    check(lastName, String);
    check(court, String);

    return Students.insert({
      firstName,
      lastName,
      court,
      registeredAt,
      createdAt: new Date(),
    });
  },
});
