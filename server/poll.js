import { Meteor } from 'meteor/meteor';
import { Tiles } from '../lib/collections';

import {
  WP,       WP_QUERY,
  CURALATE, CURALATE_QUERY,
  EVENTS,   EVENTS_QUERY
} from './endpoints';

const POLL_INTERVAL = 300000; // 5 min

function poll ( ) {
  console.log( `\n---------------- POLLING ( ${ ( POLL_INTERVAL / 1000 / 60 ).toFixed( 1 ) } minute interval )----------------\n` );
  const social = Meteor.call( 'getData', CURALATE, CURALATE_QUERY );
  const events = Meteor.call( 'getData', EVENTS,   EVENTS_QUERY );
  const posts  = Meteor.call( 'getData', WP,       WP_QUERY );

  Meteor.call( 'upsert', social.items,  'mapSocial' );
  Meteor.call( 'upsert', posts.posts,   'mapPost' );
  Meteor.call( 'upsert', events.events, 'mapEvent' );

  console.log( `\nNew Tiles collection size: ${ Tiles.find( ).fetch( ).length } tiles\n` );
}

poll( );

Meteor.setInterval( poll, POLL_INTERVAL );
