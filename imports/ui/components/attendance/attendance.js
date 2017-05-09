import { Students } from '/imports/api/students/students.js';
import { Attendance } from '/imports/api/attendance/attendance.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './attendance.html';

Template.attendance.onCreated(function () {
  court = FlowRouter.getParam('courtName').toLowerCase();
  Meteor.subscribe('students.court', court);
  Meteor.subscribe('attendance.date', court);

  // Get present students to mark checkbox
  Meteor.call('attendance.today', court, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      var ids = result ? result.studentIds : [];
      Session.set("studentIds", ids);
    }
  });
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
  attending: function(id) {
    return (Session.get("studentIds").indexOf(id) > -1);
  },
  students() {
    return Students.find({"court": court});
  },
});

Template.attendance.events({
  'submit .attendance'(event) {
    event.preventDefault();
    var presentStudents = Session.get("studentIds");
    Meteor.call('attendance.upsert', court, presentStudents, (error) => {
      if (error) {
        console.log(error);
      } else {
        FlowRouter.go("/" + court);
      }
    });
    Meteor.subscribe('attendance.today');
    Session.set("studentIds", presentStudents);
  },
  'click .attendance-check'(event) {
    var id = event.target.id;
  	var checked = event.target.checked;
    var presentStudents = Session.get("studentIds");

    if (checked) {
      presentStudents.push(id);
    } else {
      var index = presentStudents.indexOf(id);
      if (index > -1) {
        presentStudents.splice(index, 1);
      }
    }

    Session.set("studentIds", presentStudents);
  },
});
