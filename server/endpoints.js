import { Meteor } from 'meteor/meteor';

class Query {
  constructor ( endpoint, mapMethod, property, query ) {
    this.endpoint  = endpoint;
    this.mapMethod = mapMethod;
    this.property  = property;
    this.query     = query;
    this.results   = [];
    this.interval  = null;
  }

  get ( ) {
    return this.results = this.results.concat(
      Meteor.call( 'getData', this.endpoint, this.query, this.property ).map(
        entry => Meteor.call( this.mapMethod, entry )
      )
    );
  }

  poll ( interval = 300000 ) {
    return this.interval = Meteor.setInterval( this.get, interval );
  }
}

const PROGRAMS = {
    climbing:          21,
    cycling:           22,
    'Outdoor Fitness': 83
};

const eventQuery = {
  limit:         100,
  sortBy:        'date',
  sortDirection: 'asc',
  offset:        0,
  distance:      100,
  location:      20500,
  programIds:    null,
  // sa:            'United DC'
}
const curalate = new Query( 'https://api.curalate.com/v1/reels/unitedoutside',
                            'mapSocial',
                            'items',
                            { limit: 100 }
                          );

const wp = new Query( 'http://brightestyoungthings.com/api/get_recent_posts',
                      'mapPost',
                      'posts',
                      { limit: 100 }
                    );
                    console.log( wp.get() );

let queries = [ curalate, wp ];

for ( program in PROGRAMS ) {
  console.log( program )
  eventQuery.programIds = PROGRAMS[ program ];
  queries.push(
    new Query( 'https://rei.com/rest/events/nearby',
               'mapEvent',
               'events',
               eventQuery
             )
           );
}

export default queries;
// console.log( queries );

//     const data = Meteor.call( 'getData', EVENTS, programQuery );
//
//     if ( data.hasOwnProperty( 'events' ) ) {
//       data.events.forEach( event => event.activityType = program );
//       events = events.concat( data.events );
//     }
//   }
//
