import "./new-volunteer.html";
import { Volunteers } from '/imports/api/volunteers/volunteers.js';
import { Registrations } from '/imports/api/registrations/registrations.js';

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.newVolunteer.onCreated(function newVolunteerOnCreated() {
  court = FlowRouter.getParam('courtName');
  Session.set("involvement", []);
});

Template.newVolunteer.helpers({
  courtName: function () {
    return court.charAt(0).toUpperCase()+ court.slice(1);
  },
});

Template.newVolunteer.events({
  'click .involvement-check'(event){
    var involvementSelections = Session.get("involvement");
    var selection = event.target.value;
    if (event.target.checked) {
      involvementSelections.push(selection);
    } else {
      involvementSelections.splice(involvementSelections.indexOf(selection), 1);
    }
    Session.set("involvement", involvementSelections);
  },
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
      "street": target.street.value,
      "city": target.city.value,
      "state": target.state.value,
      "zip": target.zip.value,
      "borough": target.borough.value,
      "degree": target.degree.value,
      "school": target.school.value,
      "race": target.race.value,
      "occupation": target.occupation.value,
      "jobTitle": target.jobTitle.value,
      "employer": target.employer.value,
      "involvement": Session.get("involvement"),
      "referral": target.referral.value,
      "referralOther": target.referralOther.value,
      "more": target.more.value,
      "createdAt": new Date(),
    };

    Meteor.call('volunteers.insert', volunteer, (error, result) => {
      console.log(volunteer);
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
            FlowRouter.go("/court/" + court);
          }
        });
      }
    });
  },
});
