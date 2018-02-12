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

  if (!season || !program || ! site) {
      console.error("Missing season/program/site");
      FlowRouter.go("/");
  }

  Meteor.subscribe('students.court', season, program, site);
  Meteor.subscribe('volunteers.court', season, program, site);

  Session.set("studentIds", []);
  Session.set("volunteerIds", []);
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
    },
    {
      sort: {
        "lastName": 1,
      }
    });
  },
  volunteers() {
    return Volunteers.find({
      "season": season,
      "program": program,
      "site": site
    },
    {
      sort: {
        "lastName": 1,
      }
    });
  },
});

Template.attendance.events({
  'submit .attendance'(event) {
    event.preventDefault();

    if (!day || !month || !year) {
      console.error("Missing Date");
      return;
    }

    var presentStudents = Session.get("studentIds");
    var presentVolunteers = Session.get("volunteerIds");
    var date = Session.get("day") + "-" + Session.get("month") + "-" + Session.get("year");

    console.log("pv:",presentVolunteers);
    console.log("ps:",presentStudents);

    Meteor.call('attendance.upsert', season, program, site, date, presentStudents, presentVolunteers, (error) => {
      if (error) {
        console.log(error);
      } else {
        var url = "/" + season + "/" + program + "/" + site;
        FlowRouter.go(url);
      }
    });

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
  'change #day': function (event, template) {
    var day = $(event.currentTarget).val();
    console.log("day : " + day);
    Session.set("day", day);
  },
  'change #month': function (event, template) {
    var month = $(event.currentTarget).val();
    console.log("month : " + month);
    Session.set("month", month);
  },
  'change #year': function (event, template) {
    var year = $(event.currentTarget).val();
    console.log("year : " + year);
    Session.set("year", year);
  }
});
