import { Students } from '/imports/api/students/students.js';
import { Meteor } from 'meteor/meteor';
import './attendance.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

Template.attendance.onCreated(function () {
  Meteor.subscribe('students.all');
});

Template.attendance.helpers({
  courtName: function () {
    var c = FlowRouter.getParam('courtName');
    return c.charAt(0).toUpperCase() + c.slice(1);
  },
  students() {
    return Students.find({"court": FlowRouter.getParam('courtName').toLowerCase()});
  },
});

Template.attendance.events({
  'submit .attendance'(event) {
  	event.preventDefault();

  	var id = event.target.id.value;
		Meteor.call('students.markAttendance', id, (error) => {
      if (error) {
        console.log(error);
      } else {
        FlowRouter.go("/" + FlowRouter.getParam('courtName'));
      }
    });
  },
});

// Template.info.events({
//   'submit .info-link-add'(event) {
//     event.preventDefault();

//     const target = event.target;
//     const title = target.title;
//     const url = target.url;

//     Meteor.call('students.insert', title.value, url.value, (error) => {
//       if (error) {
//         alert(error.error);
//       } else {
//         title.value = '';
//         url.value = '';
//       }
//     });
//   },
// });
