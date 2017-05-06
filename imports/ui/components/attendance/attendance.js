import { Students } from '/imports/api/students/students.js';
import { Attendance } from '/imports/api/attendance/attendance.js';
import { Meteor } from 'meteor/meteor';
import './attendance.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

Template.attendance.onCreated(function () {
  Meteor.subscribe('attendance.all');
  Meteor.subscribe('students.all');
  court = FlowRouter.getParam('courtName');
  presentStudents = [];
});

Template.attendance.helpers({
  courtName: function () {
    return court.charAt(0).toUpperCase() + court.slice(1);
  },
  formattedDate: function() {
    return new Date().toDateString();
  },
  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  students() {
    return Students.find({"court": court});
  },
});

Template.attendance.events({
  'submit .attendance'(event) {
    event.preventDefault();
    Meteor.call('attendance.upsert', presentStudents, (error) => {
      if (error) {
        console.log(error);
      } else {
        FlowRouter.go("/" + court);
      }
    });
  },
  'click .attendance-check'(event) {
    var id = event.target.id;
  	var checked = event.target.checked;
    if (checked) {
      presentStudents.push(id);
    } else {
      var index = presentStudents.indexOf(id);
      if (index > -1) {
        presentStudents.splice(index, 1);
      }
    }
  },
});
