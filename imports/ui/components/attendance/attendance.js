import { Students } from '/imports/api/students/students.js';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';
import { Attendance } from '/imports/api/attendance/attendance.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './attendance.html';

Template.attendance.onCreated(function () {
  court = FlowRouter.getParam('courtName').toLowerCase();
  Meteor.subscribe('students.court', court);
  Meteor.subscribe('volunteers.court', court);
  Meteor.subscribe('attendance.date', court);

  // Get present students/volunteers to mark checkbox
  Meteor.call('attendance.today', court, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      var studentIds = result ? result.studentIds : [];
      var volunteerIds = result ? result.volunteerIds : [];
      Session.set("studentIds", studentIds);
      Session.set("volunteerIds", volunteerIds);
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
  attendingStudent: function(id) {
    return Session.get("studentIds").indexOf(id) > -1;
  },
  attendingVolunteer: function(id) {
    return Session.get("volunteerIds").indexOf(id) > -1;
  },
  students() {
    return Students.find({"court": court});
  },
  volunteers() {
    return Volunteers.find({"court": court});
  },
});

Template.attendance.events({
  'submit .attendance'(event) {
    event.preventDefault();
    var presentStudents = Session.get("studentIds");
    var presentVolunteers = Session.get("volunteerIds");
    console.log("pv:",presentVolunteers);
    console.log("ps:",presentStudents);
    Meteor.call('attendance.upsert', court, presentStudents, presentVolunteers, (error) => {
      if (error) {
        console.log(error);
      } else {
        FlowRouter.go("/court/" + court);
      }
    });
    Meteor.subscribe('attendance.today');
    Session.set("studentIds", presentStudents);
    Session.set("volunteerIds", presentVolunteers);
  },
  'click .student-check'(event) {
    var id = event.target.id;
    var checked = event.target.checked;
    var presentStudents = Session.get("studentIds");
    console.log("psclick:",presentStudents);

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
  'click .volunteer-check'(event) {
    var id = event.target.id;
  	var checked = event.target.checked;
    var presentVolunteers = Session.get("volunteerIds");
    console.log("pvclick:",presentVolunteers);

    if (checked) {
      presentVolunteers.push(id);
    } else {
      var index = presentVolunteers.indexOf(id);
      if (index > -1) {
        presentVolunteers.splice(index, 1);
      }
    }

    Session.set("volunteerIds", presentVolunteers);
  },
});
