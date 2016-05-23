import { Meteor } from 'meteor/meteor';
import { Tiles } from '../lib/collections';

import {
  WP,       WP_QUERY,
  CURALATE, CURALATE_QUERY,
  EVENTS,   EVENTS_QUERY
} from './endpoints';

const POLL_INTERVAL = 300000; // 5 min

function poll ( ) {
  const curEntries = Tiles.find( ).fetch( );
  console.log( `\n---------------- POLLING ( ${ ( POLL_INTERVAL / 1000 / 60 ).toFixed( 1 ) } minute interval )----------------\n`,
               `Initial Tiles collection size: ${ curEntries.length } tiles` );

  const social = Meteor.call( 'getData', CURALATE, CURALATE_QUERY );
  const events = Meteor.call( 'getData', EVENTS,   EVENTS_QUERY );
  const posts  = Meteor.call( 'getData', WP,       WP_QUERY );

  Meteor.call( 'upsert', social.items,  'mapSocial' );
  Meteor.call( 'upsert', posts.posts,   'mapPost' );
  Meteor.call( 'upsert', events.events, 'mapEvent' );

  const newItems = social.items.length || 0 + posts.posts.length || 0 + events.events.length || 0;
  const updatedEntries = Tiles.find( ).fetch( );
  const updatedCount = updatedEntries.length - curEntries.length;
  console.log(
    `\nNew Tiles collection size:
     ${ updatedEntries.length } tiles ( ${ updatedCount } new, ${ updatedEntries.length - updatedCount } updated )\n`
  );
}

poll( );

Meteor.setInterval( poll, POLL_INTERVAL );
