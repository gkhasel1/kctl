import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Registrations, RegistrationsSchema, CURRENT_SEASON } from './registrations.js';

Registrations._ensureIndex(
  {
    entityId: 1,
    season: 1,
    program: 1,
    site: 1
  }, {
    unique: 1
  }
);

Meteor.methods({
  'registrations.insert'(season, program, site, entityId, entityRole) {
    var data = {
      "entityId": entityId,
      "entityRole": entityRole,
      "season": season,
      "program": program,
      "site": site,
      "createdAt": new Date(),
    };

    check(data, RegistrationsSchema);

    return Registrations.insert(data);
  },
});
