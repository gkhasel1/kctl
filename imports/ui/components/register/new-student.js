import "./new-student.html";
import { Students } from '/imports/api/students/students.js';

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.newStudent.onCreated(function newStudentOnCreated() {
  // Meteor.subscribe('students.all');
  court = FlowRouter.getParam('courtName');
});

Template.newStudent.helpers({
  courtName: function () {
    return court.charAt(0).toUpperCase()+ court.slice(1)
  },
});

Template.newStudent.events({
  'submit .register-student'(event, template) {
    event.preventDefault();
    var target = event.target;
    var student = {
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
    }

    console.log(student);

    Meteor.call('students.insert', student, (error) => {
      if (error) {
        console.log(error);
        alert(error);
      } else {
        FlowRouter.go("/" + FlowRouter.getParam('courtName'));
      }
    });
  },
});
