import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';

import '../../ui/pages/home/home.js';
import '../../ui/pages/options/options.js';
import '../../ui/pages/attendance/attendance.js';
import '../../ui/pages/register/register.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/data/data.js';

/**
 * Health Check
 **/
FlowRouter.route('/_health', {
  name: 'health check',
  action() {
    return "OK";
  },
});

/**
 * Home Page for Court Selection
 **/
FlowRouter.route('/', {
  name: 'Home Page (Court select)',
  action() {
    BlazeLayout.render('App', { main: 'Home' });
  },
});

/**
 * Court Options (Reg, Attendence etc.)
 *   courtName: {robinson, lafayette, marcy, sumner, tompkins}
 **/
FlowRouter.route('/court/:courtName', {
  name: 'Options Page (per Court)',
  action(params) {
    BlazeLayout.render('App', { main: 'Options' });
  },
});

/**
 * Register a student for a court
 **/
FlowRouter.route('/court/:courtName/new-student', {
  name: 'New Student',
  action(params) {
    console.log("reg student: ", params);
    BlazeLayout.render('App', { main: 'RegisterStudent' });
  },
});

/**
 * Register a volunteer for a court
 **/
FlowRouter.route('/court/:courtName/new-volunteer', {
  name: 'New Volunteer',
  action(params) {
    BlazeLayout.render('App', { main: 'RegisterVolunteer' });
  },
});

/**
 * Court Session Attendance
 **/
FlowRouter.route('/court/:courtName/attendance', {
  name: 'Court Attendance',
  action(params) {
    BlazeLayout.render('App', { main: 'Attendance' });
  },
});

/**
 * Secret Data Page
 **/
FlowRouter.route('/super-secret-data', {
  name: 'Super Secret Data Page',
  action(params) {
    BlazeLayout.render('App', { main: 'Data' });
  },
});

/**
 * 404
 **/
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App', { main: 'NotFound' });
  },
};
