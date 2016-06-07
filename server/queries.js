import { Meteor } from 'meteor/meteor';

class Query {
  constructor ( config ) {
    this.endpoint  = config.endpoint;
    this.mapMethod = config.mapMethod;
    this.property  = config.property;
    this.query     = config.query;
    this.results   = [];
    this.interval  = null;

    this.resolve( );
  }

  resolve ( ) {
    return Meteor.call( 'getData', this.endpoint, this.query, this.property ).map(
      result => !_.some( this.results, [ 'key', result.key ] ) ? this.results.push( Meteor.call( this.mapMethod, result ) ) : null
    );
  }

  poll ( interval = 300000 ) {
    if ( this.results.length < 1 ) {
      this.resolve();
    }

    return this.interval = Meteor.setInterval( this.resolve, interval );
  }

  stop ( ) {
    return Meteor.clearInterval( this.interval );
  }

  reset ( ) {
    return this.results = [];
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
const wp       = new Query( wpQuery);

let queries = [ curalate, wp ];

for ( program in PROGRAMS ) {
  eventQuery.query.programIds = PROGRAMS[ program ];
  query = new Query( eventQuery );
  query.results.forEach( result => result.activityType = program )

  queries.push( query );
}

export default queries;
