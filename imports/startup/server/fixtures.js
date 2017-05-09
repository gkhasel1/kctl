// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/students/students.js';

Meteor.startup(() => {
  console.log("Server Startup");
  // if (Students.find().count() === 0) {
  //   const data = [
  //     {
  //       firstName: 'Ammon',
  //       lastName: 'Kansupada',
  //       createdAt: new Date(),
  //     },
  //     {
  //       firstName: 'G',
  //       lastName: 'K',
  //       createdAt: new Date(),
  //     },
  //   ];

  //   data.forEach(student => Students.insert(student));
  // }
});
