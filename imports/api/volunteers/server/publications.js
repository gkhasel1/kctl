import { Meteor } from 'meteor/meteor';
import { Volunteers } from '../volunteers.js';

Meteor.publish('volunteers.all', function () {
  return volunteers.find({});
});

Meteor.publish('volunteers.court', function (court) {
  return volunteers.find({court: court});
});
