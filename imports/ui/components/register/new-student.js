import "./new-student.html";
import { Students } from '/imports/api/students/students.js';

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.newStudent.onCreated(function newStudentOnCreated() {
  Meteor.subscribe('students.all');
});

Template.newStudent.helpers({
  courtName: function () {
    return FlowRouter.getParam('courtName');
  },
  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});

Template.newStudent.events({
  'submit .register-student'(event) {
    event.preventDefault();

    //implicitly need to save:
    //  Court Name
    //  Registration Date
    const court = FlowRouter.getParam('courtName').toLowerCase();
    const registeredAt = new Date();
    const target = event.target;
    const fname = event.target.firstName.value.toLowerCase();
    const lname = event.target.lastName.value.toLowerCase();
    console.log("fname :", fname);
    console.log("lname :", lname);
    console.log("court :", court);
    console.log("reg :", registeredAt);

    Meteor.call('students.insert', fname, lname, court, registeredAt, (error) => {
      if (error) {
        console.log(error);
      } else {
        FlowRouter.go("/" + FlowRouter.getParam('courtName'));
      }
    });
  },
});
