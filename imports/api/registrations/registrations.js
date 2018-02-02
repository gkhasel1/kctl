import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Registrations = new Mongo.Collection('registrations');

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
  program: {
    type: String,
    label: "program of registration",
  },
  site: {
    type: String,
    label: "site of registration",
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
  createdAt: {
    type: Date,
    label: "Datetime of registration",
  },
});
