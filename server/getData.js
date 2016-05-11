import { Meteor } from 'meteor/meteor';
import { Mongo }  from 'meteor/mongo';

import Wp from 'wordpress-rest-api';
import { WP, CURALATE, EVENTS } from './endpoints';

import { Social } from '../imports/collections/social';
import { Posts }  from '../imports/collections/posts';
import { Events } from '../imports/collections/events';
const EVENT_OPTIONS = {
  params: {
      sortBy:        'date',
      sortDirection: 'asc',
      offset:        0,
      limit:         20,
      distance:      50,
      location:      20500,
      // sa:            'Adventure',
      // ca:            'Women Only'
  }
}

Meteor.methods( {
  getWpData ( ) {
    this.unblock();

    let results = WP.map(
      endpoint => new Wp( { endpoint: endpoint } ).posts( )
        .then( data => data )
        .catch( err => console.error( err ) )
    );

    Posts.insert( results );

    return results;
  },

  getEventData ( ) {
    this.unblock();

    let results = HTTP.get(
      EVENTS,
      EVENT_OPTIONS
    );

    Events.insert( results );

    return results;
  },

  getCuralateData ( ) {
    this.unblock();

    let results = HTTP.get(
      CURALATE,
      {}
    );

    Social.insert( results );

    return results;
  }
} );
