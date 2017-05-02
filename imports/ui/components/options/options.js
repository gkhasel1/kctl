import './options.html';

import { FlowRouter } from 'meteor/kadira:flow-router';


Template.options.onCreated(function OptionsOnCreated() {
  console.log("getparam: ", FlowRouter.getParam('courtName'));
});

Template.options.events({
  'click .option-button': function(event){
    var courtName = FlowRouter.getParam('courtName');
    var action = event.target.id;
    FlowRouter.go("/" + courtName + "/" + action);
  }
});
