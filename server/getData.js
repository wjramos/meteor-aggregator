import { Meteor } from 'meteor/meteor';
import { Mongo }  from 'meteor/mongo';

import { WP, WP_QUERY, CURALATE, CURALATE_QUERY, EVENTS, EVENTS_QUERY } from './endpoints';

Meteor.methods( {
  getWpData ( ) {
    this.unblock();
    console.log( 'Retrieving WordPress Data' );
    let results = HTTP.get(
      WP,
      WP_QUERY
    ).data.posts;

    if ( results ) {
      console.log( `Wordpress request finished: ${ results.length } posts retrieved` );
      return results;
    }
  },

  getEventData ( ) {
    this.unblock();
    console.log( 'Retrieving Events Data' );
    let results = HTTP.get(
      EVENTS,
      EVENTS_QUERY
    ).data.events;

    if ( results ) {
      console.log( `Events request finished: ${ results.length } events retrieved` );
      return results;
    }

    return [];
  },

  getCuralateData ( ) {
    this.unblock();
    console.log( 'Retrieving Curalate Data' );
    let results = HTTP.get(
      CURALATE,
      CURALATE_QUERY
    ).data.items;

    // Get and update store if delta
    if ( results ) {
      console.log( `Curalate request finished: ${ results.length } items retrieved` );
      return results;
    }

    return [];
  }
} );
