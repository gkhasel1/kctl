import './options.html';

import { FlowRouter } from 'meteor/kadira:flow-router';


Template.options.onCreated(function OptionsOnCreated() {
  console.log("getparam: ", FlowRouter.getParam('courtName'));
});

Template.options.helpers({
  courtName: function () {
    return FlowRouter.getParam('courtName');
  },
  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});

Template.options.events({
  'click .option-button': function(event){
    var courtName = FlowRouter.getParam('courtName');
    var action = event.target.id;
    FlowRouter.go("/" + courtName + "/" + action);
  }
});
