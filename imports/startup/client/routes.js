import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/options/options.js';
import '../../ui/pages/attendance/attendance.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'Home Page (Court select)',
  action() {
    BlazeLayout.render('App', { main: 'Home' });
  },
});

/**
 * Court must be in:
 *   {jr, lg, marcy, sumner, tompkins}
 **/
FlowRouter.route('/:courtName', {
  name: 'Options Page (per Court)',
  action(params) {
    console.log("[court] params:", params);
    BlazeLayout.render('App', { main: 'Options' });
  },
});

/**
 * Action must be in:
 *   {register, attendance}
 **/
FlowRouter.route('/:courtName/:action', {
  name: 'Register, Attendance, per court',
  action(params) {
    console.log("[action] params: ", params);
    BlazeLayout.render('App', { main: params.action });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App', { main: 'NotFound' });
  },
};
