import "./new-student.html";

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.newStudent.onCreated(function newStudentOnCreated() {
  console.log("[student reg param]: ", FlowRouter.getParam('courtName'));
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
    console.log("WOAH", target);
    event.preventDefault();

    const target = event.target;
    const fname = event.target.firstName.value;
    const lname = event.target.lastName.value;
    console.log("fname :", fname);
    console.log("lname :", lname);

    Meteor.call('students.insert', fname, lname, (error) => {
      if (error) {
        alert(error.error);
      } else {
        FlowRouter.go("/" + FlowRouter.getParam('courtName'));
      }
    });
  },
});
