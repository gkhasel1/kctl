import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Students, StudentSchema } from './students.js';

Students._ensureIndex({firstName: 1, lastName: 1, parentEmail: 1}, {unique: 1});

Meteor.methods({
  'students.insert'(student) {
    student['createdAt'] = new Date();
    check(student, StudentSchema);

    var context = StudentSchema.newContext();
    if(!context.validate(student)) {
      var fields = context.invalidKeys();
      for(var i in fields) {
        errors.push(context.keyErrorMessage(fields[i].name));
      }
      throw errors;
    }
    return Students.insert(student);
  },
});
