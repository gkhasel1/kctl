import { Meteor } from 'meteor/meteor';
import { Volunteers } from '../volunteers.js';

Meteor.publish('volunteers.all', function () {
  return Volunteers.find({});
});

Meteor.publish('volunteers.court', function (season, program, site) {
  return Volunteers.find({
    season: season,
    program: program,
    site: site
  });
});
