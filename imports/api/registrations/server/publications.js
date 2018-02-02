import { Meteor } from 'meteor/meteor';
import { Registrations, CURRENT_SEASON } from '../registrations.js';

Meteor.publish('registrations.all', function () {
  return Registrations.find({});
});

Meteor.publish('registrations.current', function (season, program, site) {
  return Registrations.find({
    season: season,
    program: program,
    site: site
  });
});
