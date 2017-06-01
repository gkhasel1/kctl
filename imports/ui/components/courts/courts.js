import './courts.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

Template.courts.events({
  'click .court-button': function(event){
    console.log(event.target.id);
    FlowRouter.go("/court/" + event.target.id);
  }
});
