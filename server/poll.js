import { Meteor } from 'meteor/meteor';
import { /*Events, Posts, Social, */Tiles } from '../lib/collections';

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
console.log( Tiles );
  if ( social && social.items ) {
    social.items.forEach(
      tile => Tiles.update(
        { key:    tile.id },
        { $set:   Meteor.call( 'mapSocial', tile ) },
        { upsert: true }
      )
    );
  }

  if ( posts && posts.posts ) {
    posts.posts.forEach(
      tile => Tiles.update(
        { key:    tile.id },
        { $set:   Meteor.call( 'mapPost', tile ) },
        { upsert: true }
      )
    );
  }

  if ( events && events.events ) {
    events.events.forEach(
      tile => Tiles.update(
        { key:    tile.sessionId },
        { $set:   Meteor.call( 'mapEvent', tile ) },
        { upsert: true }
      )
    );
  }


  // if ( social && social.items ) {
  //   social.items.forEach(
  //       item => Social.update(
  //           { id:     item.id },
  //           { $set:   item },
  //           { upsert: true }
  //       )
  //   );
  // }

  // if ( events && events.events ) {
  //   events.events.forEach(
  //       item => Events.update(
  //           { sessionId: item.sessionId },
  //           { $set:      item },
  //           { upsert:    true }
  //       )
  //   );
  // }

  // if ( posts && posts.posts ) {
  //   posts.posts.forEach(
  //       item => Posts.update(
  //           { id:     item.id },
  //           { $set:   item },
  //           { upsert: true }
  //       )
  //   );
  // }
}

poll( );

Meteor.setInterval( poll, POLL_INTERVAL );
