// Definition of the students collection

import { Mongo } from 'meteor/mongo';

export const Students = new Mongo.Collection('students');

Students.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
