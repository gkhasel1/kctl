import './courts.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

Template.courts.helpers({
    seasons: function(){
        return ["Winter"];
    },
    programs: function(){
        return ["After School"];
    },
    sites: function(){
        return ["Over 10", "Under 10"];
    }
});

Template.courts.events({
    "change #season-select": function (event, template) {
        var season = $(event.currentTarget).val();
        season = season.replace(/\s+/g, '-').toLowerCase();
        console.log("season : " + season);
        Session.setPersistent("season", season);
    },
    "change #program-select": function (event, template) {
        var program = $(event.currentTarget).val();
        program = program.replace(/\s+/g, '-').toLowerCase();
        console.log("program : " + program);
        Session.setPersistent("program", program);
    },
    "change #site-select": function (event, template) {
        var site = $(event.currentTarget).val();
        site = site.replace(/\s+/g, '-').toLowerCase();
        console.log("site : " + site);
        Session.setPersistent("site", site);
    },
    'click #start-button': function(event){
        var season = Session.get("season");
        var program = Session.get("program");
        var site = Session.get("site");
        var url = "/" + season + "/" + program + "/" + site;
        console.log(Session);
        console.log(url);
        FlowRouter.go(url);
  }
});
