import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Registrations, RegistrationsSchema, CURRENT_SEASON } from './registrations.js';

Registrations._ensureIndex({entityId: 1, court: 1, season: 1}, {unique: 1});

Meteor.methods({
  'registrations.insert'(court, entityId, entityRole) {
    var data = {
      "entityId": entityId,
      "entityRole": entityRole,
      "court": court,
      "season": CURRENT_SEASON,
      "createdAt": new Date(),
    };

    check(data, RegistrationsSchema);

    return Registrations.insert(data);
  },
});
