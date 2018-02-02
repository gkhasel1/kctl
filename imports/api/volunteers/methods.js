import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Volunteers, VolunteerSchema } from './volunteers.js';

Volunteers._ensureIndex(
  {
    firstName: 1,
    lastName: 1,
    dob: 1,
    email: 1
  }, {
    unique: 1
  }
);

Meteor.methods({
  'volunteers.insert'(volunteer) {
    check(volunteer, VolunteerSchema);
    return Volunteers.insert(volunteer);
  },
});
