import { Students } from '/imports/api/students/students.js';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';
import { Attendance } from '/imports/api/attendance/attendance.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './attendance.html';

Template.attendance.onCreated(function () {
  season = Session.get("season");
  program = Session.get("program");
  site = Session.get("site");
  Meteor.subscribe('students.court', season, program, site);
  Meteor.subscribe('volunteers.court', season, program, site);
  Meteor.subscribe('attendance.date', season, program, site);

  // Get present students/volunteers to mark checkbox
  Meteor.call('attendance.today', season, program, site, (error, result) => {
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
  season: function () {
    return season;
  },
  program: function () {
    return program;
  },
  site: function () {
    return site;
  },
  format: function(str) {
    str = str.replace('-', " ");
    str = str.replace(
      /\w\S*/g,
      function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
    return str;
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
    return Students.find({
      "season": season,
      "program": program,
      "site": site
    });
  },
  volunteers() {
    return Volunteers.find({
      "season": season,
      "program": program,
      "site": site
    });
  },
});

Template.attendance.events({
  'submit .attendance'(event) {
    event.preventDefault();
    var presentStudents = Session.get("studentIds");
    var presentVolunteers = Session.get("volunteerIds");
    console.log("pv:",presentVolunteers);
    console.log("ps:",presentStudents);
    Meteor.call('attendance.upsert', season, program, site, presentStudents, presentVolunteers, (error) => {
      if (error) {
        console.log(error);
      } else {
        var url = "/" + season + "/" + program + "/" + site;
        FlowRouter.go(url);
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
