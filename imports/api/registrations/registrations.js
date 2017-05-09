import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Registrations = new Mongo.Collection('registrations');

// WARNING: Change this when a new season starts or else
//          registrations will be for the wrong season!
export const CURRENT_SEASON = "summer2017";

Registrations.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const RegistrationsSchema = new SimpleSchema({
  season: {
    type: String,
    label: "Season of registration",
  },
  entityId: {
    type: String,
    label: "Id of student or volunteer",
  },
  entityRole: {
    type: String,
    label: "Role of person registering",
    allowedValues: ['student', 'volunteer'],
  },
  court: {
    type: String,
    label: "Court",
    allowedValues: ['marcy', 'sumner', 'robinson', 'lafayette', 'tompkins'],
  },
  createdAt: {
    type: Date,
    label: "Datetime of registration",
  },
});
