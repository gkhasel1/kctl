// Definition of the students collection

import { Mongo } from 'meteor/mongo';

export const Attendance = new Mongo.Collection('attendance');

Attendance.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
