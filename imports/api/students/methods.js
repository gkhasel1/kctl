import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Students, StudentSchema } from './students.js';

Students._ensureIndex({firstName: 1, lastName: 1, dob: 1, parentEmail: 1}, {unique: 1});

Meteor.methods({
  'students.insert'(student) {
    student['createdAt'] = new Date();
    check(student, StudentSchema);
    return Students.insert(student);
  },
});
