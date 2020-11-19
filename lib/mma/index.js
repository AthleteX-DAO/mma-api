
/*

  MMA API in NodeJS
  -----------------

  Copyright: (c) 2015 Andrew Valish
  License: BSD, see LICENSE for more details

*/

//var ufc = require('ufc');
var sherdog = require('sherdog');
var googleIt = require('google-it');

//-------------------------------------------------------+
//  Get Fighter Profile Data
//  mma.getFighter("Jon Jones", callback(data));
//-------------------------------------------------------+

var fighter = function(query, callback) {

  //----------------------------------+
  //  JSON object for Fighter
  //----------------------------------+
  var fighter = {
    name: "",
    isOwned: false,
    nickname: "",
    fullname: "",
    record: "",
    association: "",
    age: "",
    birthday: "",
    hometown: "",
    nationality: "",
    location: "",
    height: "",
    height_cm: "",
    weight: "",
    weight_kg: "",
    weight_class: "",
    college: "",
    degree: "",
    summary: [],
    wins: {
      total: 0,
      knockouts: 0,
      submissions: 0,
      decisions: 0,
      others: 0
    },
    losses: {
      total: 0,
      knockouts: 0,
      submissions: 0,
      decisions: 0,
      others: 0
    },
    strikes: {
      attempted: 0,
      successful: 0,
      standing: 0,
      clinch: 0,
      ground: 0
    },
    takedowns: {
      attempted: 0,
      successful: 0,
      submissions: 0,
      passes: 0,
      sweeps: 0
    },
    fights: []
  };

  //-----------------------------------------------+
  //  Query Google Search for Fighter Profiles
  //  https://github.com/jprichardson/node-google
  //-----------------------------------------------+

  googleIt({'only-urls':true, query: query + ' sherdog'}).then(results =>{
    for(var i=0;i<results.length;i++){
      if(results[i].link.indexOf('sherdog.com/fighter')>-1){
        sherdog_url = results[i].link;
        break;
      }
    }

    sherdog.getFighter(sherdog_url, function(data) {
      fighter.name = data.name;
      fighter.nickname = data.nickname;
      fighter.association = data.association;
      fighter.age = data.age;
      fighter.birthday = data.birthday;
      fighter.hometown = data.locality;
      fighter.nationality = data.nationality;
      fighter.height = data.height;
      fighter.weight = data.weight;
      fighter.weight_class = data.weight_class;
      fighter.wins = data.wins;
      fighter.losses = data.losses;
      fighter.fights = data.fights;

      callback(fighter);

      // Search for UFC profile
      /*
      google(query + ' ufc', function(err, next, links) {
        if (err) console.error(err);

        for (var i = 0; i < links.length; ++i) {
          if (resultContains(links[i], "ufc.com/athlete/")) {
            ufc_slug = links[i].href.split('/')[links[i].href.split('/').length - 1];
            ufc_url = 'http://media.ufc.com/fighter/' + ufc_slug;
            i = 10;
          }
        }

        //------------------------------------------+
        //  Crawl and Parse UFC Profile
        //  https://github.com/valish/ufc-api
        //------------------------------------------+
        if (ufc_url) {
          ufc.getFighter(ufc_url, function(data) {
            fighter.fullname = data.fullname;
            fighter.hometown = data.hometown;
            fighter.location = data.location;
            fighter.height = data.height;
            fighter.height_cm = data.height_cm;
            fighter.weight = data.weight;
            fighter.weight_kg = data.weight_kg;
            fighter.record = data.record;
            fighter.college = data.college;
            fighter.degree = data.degree;
            fighter.summary = data.summary;
            fighter.strikes = data.strikes;
            fighter.takedowns = data.takedowns;

            callback(fighter);
          });
        } else {
          callback(fighter);
        }
      });*/

    });

  }).catch( e =>{
    console.error(e);
  })
}

module.exports.fighter = fighter;
