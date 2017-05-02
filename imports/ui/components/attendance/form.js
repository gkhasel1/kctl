// // import { Links } from '/imports/api/links/links.js';
// // import { Meteor } from 'meteor/meteor';
import './form.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

// Template.info.onCreated(function () {
//   // Meteor.subscribe('links.all');
// });

Template.attendance.helpers({
  courtName() {
    return FlowRouter.getParam(courtName);
  },
});

// Template.info.events({
//   'submit .info-link-add'(event) {
//     event.preventDefault();

//     const target = event.target;
//     const title = target.title;
//     const url = target.url;

//     Meteor.call('links.insert', title.value, url.value, (error) => {
//       if (error) {
//         alert(error.error);
//       } else {
//         title.value = '';
//         url.value = '';
//       }
//     });
//   },
// });
