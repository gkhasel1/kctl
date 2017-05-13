import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Volunteers, Volunteerschema } from './volunteers.js';

Volunteers._ensureIndex({firstName: 1, lastName: 1, dob: 1, email: 1}, {unique: 1});

Meteor.methods({
  'volunteers.insert'(volunteer) {
    volunteer['createdAt'] = new Date();
    check(volunteer, Volunteerschema);
    return Volunteers.insert(volunteer);
  },
});
