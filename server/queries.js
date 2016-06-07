import { Meteor } from 'meteor/meteor';

class Query {
  constructor ( config ) {
    this.endpoint  = config.endpoint;
    this.mapMethod = config.mapMethod;
    this.property  = config.property;
    this.query     = config.query;
    this.results   = [];
    this.interval  = null;
  }

  resolve ( ) {
    return this.results = this.results.concat(
      Meteor.call( 'getData', this.endpoint, this.query, this.property ).map(
        result => Meteor.call( this.mapMethod, result )
      )
    );
  }

  poll ( interval = 300000 ) {
    return this.interval = Meteor.setInterval( this.resolve, interval );
  }

  stop ( ) {
    return Meteor.clearInterval( this.interval );
  }
}

const PROGRAMS = {
    'Climbing':        21,
    'Cycling':         22,
    'Outdoor Fitness': 83
};

const eventQuery = {
  endpoint:  'https://rei.com/rest/events/nearby',
  mapMethod: 'mapEvent',
  property:  'events',
  query: {
    limit:         100,
    sortBy:        'date',
    sortDirection: 'asc',
    offset:        0,
    distance:      100,
    location:      20500,
    programIds:    null,
    // sa:            'United DC'
  }
}

const curalateQuery = {
  endpoint:  'https://api.curalate.com/v1/reels/unitedoutside',
  mapMethod: 'mapSocial',
  property:  'items',
  query:     { limit: 100 }
};

const wpQuery = {
  endpoint:  'http://brightestyoungthings.com/api/get_recent_posts',
  mapMethod: 'mapPost',
  property:  'posts',
  query:     { limit: 100 }
}

const curalate = new Query( curalateQuery );
const wp = new Query( wpQuery);

let queries = [ curalate, wp ];

for ( program in PROGRAMS ) {
  eventQuery.query.programIds = PROGRAMS[ program ];
  queries.push(
    new Query( eventQuery )
  );
}

export default queries;
console.log( queries );

//     const data = Meteor.call( 'getData', EVENTS, programQuery );
//
//     if ( data.hasOwnProperty( 'events' ) ) {
//       data.events.forEach( event => event.activityType = program );
//       events = events.concat( data.events );
//     }
//   }
//
