import { Meteor } from 'meteor/meteor';
import { Events, Posts, Social } from '../imports/collections';

import {
  WP,       WP_QUERY,
  CURALATE, CURALATE_QUERY,
  EVENTS,   EVENTS_QUERY
} from './endpoints';

const POLL_INTERVAL = 300000; // 5 min

function poll ( ) {
  console.log( `---------------- POLLING ( ${ ( POLL_INTERVAL / 1000 / 60 ).toFixed( 1 ) } minute interval )----------------` );
  const social = Meteor.call( 'getData', CURALATE, CURALATE_QUERY );
  const events = Meteor.call( 'getData', EVENTS,   EVENTS_QUERY );
  const posts  = Meteor.call( 'getData', WP,       WP_QUERY );

  if ( social && social.items ) {
    social.items.forEach(
        item => Social.update(
            { id:     item.id },
            { $set:   item },
            { upsert: true }
        )
    );
  }

  if ( events && events.events ) {
    events.events.forEach(
        item => Events.update(
            { sessionId: item.sessionId },
            { $set:      item },
            { upsert:    true }
        )
    );
  }

  if ( posts && posts.posts ) {
    posts.posts.forEach(
        item => Posts.update(
            { id:     item.id },
            { $set:   item },
            { upsert: true }
        )
    );
  }
}

// Publish generic collection -- split out into new publications file
Meteor.publish( 'social.public', ( ) => {
  const entries = Social.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );

Meteor.publish( 'events.public', ( ) => {
  const entries = Events.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );

Meteor.publish( 'posts.public', ( ) => {
  const entries = Posts.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );


poll( );

Meteor.setInterval( poll, POLL_INTERVAL );
