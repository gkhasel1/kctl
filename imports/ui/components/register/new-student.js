import "./new-student.html";
import { Students } from '/imports/api/students/students.js';
import { Registrations } from '/imports/api/registrations/registrations.js';

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.newStudent.onCreated(function newStudentOnCreated() {
  season = Session.get("season");
  program = Session.get("program");
  site = Session.get("site");

  if (!season || !program || ! site) {
      console.error("Missing season/program/site");
      FlowRouter.go("/");
  }
});

Template.newStudent.helpers({
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
});

Template.newStudent.events({
  'submit .register-student'(event, template) {
    event.preventDefault();
    var target = event.target;
    var student = {
      "season": season,
      "program": program,
      "site": site,
      "createdAt": new Date(),
      "firstName": target.firstName.value,
      "lastName": target.lastName.value,
      "gender": target.gender.value,
      "dob": target.day.value + "-" + target.month.value + "-" + target.year.value,
      "parentName": target.parentName.value,
      "parentEmail": target.parentEmail.value,
      "parentPrimaryPhone": target.parentPrimaryPhone.value.replace(/\D/g,''),
      "parentSecondaryPhone": target.parentSecondaryPhone.value.replace(/\D/g,''),
      "parentAddress": target.parentAddress.value,
      "housing": target.housing.value,
      "otherHousing": target.otherHousing.value,
      "otherHousingName": target.otherHousingName.value,
      "income": target.income.value,
      "members": target.members.value,
      "race": target.race.value,
      "emergencyName": target.emergencyName.value,
      "emergencyPhone": target.emergencyPhone.value.replace(/\D/g,''),
      "emergencyRelationship": target.emergencyRelationship.value,
      "allergy": target.allergy.value,
      "medical": target.medical.value,
      "uniform": target.uniform.value,
      "referral": target.referral.value,
      "referralOther": target.referralOther.value,
    };

    console.log(student);

    Meteor.call('students.insert', student, (error, result) => {
      if (error) {
        console.log(error);
        alert("Error: Failed to create student");
      } else {
        var entityId = result;
        console.log("result-student:", result);

        Meteor.call('registrations.insert', season, program, site, entityId, "student", (error, result) => {
          if (error) {
            console.log(error);
            alert("Error: Failed to register student");
          } else {
            console.log("result-reg:", result);
            var url = "/" + season + "/" + program + "/" + site;
            FlowRouter.go(url);
          }
        });
      }
    });
  },
});
