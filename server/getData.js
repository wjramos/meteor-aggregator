import { Meteor } from 'meteor/meteor';
import { Mongo }  from 'meteor/mongo';
import Wp from 'wordpress-rest-api';

import { WP, WP_QUERY, CURALATE, CURALATE_QUERY, EVENTS, EVENTS_QUERY } from './endpoints';

Meteor.methods( {
  getWpData ( ) {
    this.unblock();
    console.log( 'Retrieving WordPress Data' );
    let results = HTTP.get(
      WP,
      WP_QUERY
    ).data;

    if ( results.posts ) {
      console.log( `Wordpress request finished: ${ results.posts.length } posts retrieved` );
      return results;
    }
  },

  getEventData ( ) {
    this.unblock();
    console.log( 'Retrieving Events Data' );
    let results = HTTP.get(
      EVENTS,
      EVENTS_QUERY
    ).data;

    if ( results.events ) {
      console.log( `Events request finished: ${ results.events.length } events retrieved` );
      return results;
    }
  },

  getCuralateData ( ) {
    this.unblock();
    console.log( 'Retrieving Curalate Data' );
    let results = HTTP.get(
      CURALATE,
      CURALATE_QUERY
    ).data;

    // Get and update store if delta
    if ( results.items ) {
      console.log( `Curalate request finished: ${ results.items.length } items retrieved` );
      return results;
    }

    //Else return local store
  }
} );
