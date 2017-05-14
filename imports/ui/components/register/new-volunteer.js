import "./new-volunteer.html";
import { Volunteers } from '/imports/api/volunteers/volunteers.js';
import { Registrations } from '/imports/api/registrations/registrations.js';

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.newVolunteer.onCreated(function newVolunteerOnCreated() {
  court = FlowRouter.getParam('courtName');
});

Template.newVolunteer.helpers({
  courtName: function () {
    return court.charAt(0).toUpperCase()+ court.slice(1);
  },
});

Template.newVolunteer.events({
  'submit .register-volunteer'(event, template) {
    event.preventDefault();
    var target = event.target;
    var volunteer = {
      "court": court,
      "firstName": target.firstName.value,
      "lastName": target.lastName.value,
      "gender": target.gender.value,
      "dob": target.day.value + "-" + target.month.value + "-" + target.year.value,
      "email": target.email.value,
      "phone": target.phone.value.replace(/\D/g,''),
      // "parentSecondaryPhone": target.parentSecondaryPhone.value.replace(/\D/g,''),
      // "parentAddress": target.parentAddress.value,
      // "housing": target.housing.value,
      // "otherHousing": target.otherHousing.value,
      // "otherHousingName": target.otherHousingName.value,
      // "income": target.income.value,
      // "members": target.members.value,
      // "race": target.race.value,
      // "emergencyName": target.emergencyName.value,
      // "emergencyPhone": target.emergencyPhone.value.replace(/\D/g,''),
      // "emergencyRelationship": target.emergencyRelationship.value,
      // "allergy": target.allergy.value,
      // "medical": target.medical.value,
      // "uniform": target.uniform.value,
      // "referral": target.referral.value,
      // "referralOther": target.referralOther.value,
    };

    console.log(volunteer);

    Meteor.call('volunteers.insert', volunteer, (error, result) => {
      if (error) {
        console.log(error);
        alert("Error: Failed to create volunteer");
      } else {
        var entityId = result;
        console.log("result-volunteer:", result);

        Meteor.call('registrations.insert', court, entityId, "volunteer", (error, result) => {
          if (error) {
            console.log(error);
            alert("Error: Failed to register volunteer");
          } else {
            console.log("result-reg:", result);
            FlowRouter.go("/" + court);
          }
        });
      }
    });
  },
});
