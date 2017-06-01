import { Meteor } from 'meteor/meteor';
import { Volunteers } from '../volunteers.js';

Meteor.publish('volunteers.all', function () {
  return Volunteers.find({});
});

Meteor.publish('volunteers.court', function (court) {
  return Volunteers.find({court: court});
});
