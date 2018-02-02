import './options.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

Template.options.onCreated(function optionsOnCreated() {
    season = Session.get("season");
    program = Session.get("program");
    site = Session.get("site");
});

Template.options.helpers({
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
  }
});

Template.options.events({
  'click .option-button': function(event){
    var action = event.target.id;
    var url = "/" + season + "/" + program + "/" + site + "/" + action;
    console.log(url);
    FlowRouter.go(url);
  }
});
