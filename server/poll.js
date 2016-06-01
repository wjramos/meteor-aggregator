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

  let newItems = 0;

  function getEvents ( ) {
    const events = Meteor.call( 'getData', EVENTS, EVENTS_QUERY );
    Meteor.call( 'upsert', events.events, 'mapEvent' );
    return events.events || [];
  }

  function getPosts ( ) {
    const posts  = Meteor.call( 'getData', WP, WP_QUERY );
    Meteor.call( 'upsert', posts.posts, 'mapPost' );
    return posts.posts || [];
  }

  function getSocial ( ) {
    const social = Meteor.call( 'getData', CURALATE, CURALATE_QUERY );
    Meteor.call( 'upsert', social.items, 'mapSocial' );
    return social.items || [];
  }

  let events = getEvents();
  let posts  = getPosts();
  let social = getSocial();

  /* Result Reporting */
  const updatedEntries = Tiles.find( ).fetch( );
  const retrievedCount = events.length + posts.length + social.length;
  const difference     = updatedEntries.length - curEntries.length;
  console.log(
    `\n\nNew Tiles collection size:
     ${ updatedEntries.length } tiles ( ${ difference } new, ${ retrievedCount - difference } updated )\n`
  );
}

poll( );

Meteor.setInterval( poll, POLL_INTERVAL );
