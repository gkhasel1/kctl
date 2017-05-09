import { Meteor } from 'meteor/meteor';
import { Registrations, CURRENT_SEASON } from '../registrations.js';

Meteor.publish('registrations.all', function () {
  return Registrations.find({});
});

Meteor.publish('registrations.current', function (court) {
  return Registrations.find({court: court, season: CURRENT_SEASON});
});
