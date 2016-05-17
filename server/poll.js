import { Meteor } from 'meteor/meteor';
import { Events, Posts, Social } from '../imports/collections';
import { Schemas } from '../imports/schemas';

const POLL_INTERVAL = 300000; // 5 min

function poll ( ) {
    console.log( 'polling' );
    let social = Meteor.call( 'getCuralateData' );
    let events = Meteor.call( 'getEventData' );
    let posts  = Meteor.call( 'getWpData' )

    // Purge collections -- should try and find a way to check dupes
    Social.remove( {} );
    Events.remove( {} );
    Posts.remove(  {} );

    // TODO: Apply Schema, consolidate and sort into a proxy collection
    social.forEach( item => Social.insert( item/*, { _id : item.id }*/ ) );
    events.forEach( item => Events.insert( item/*, { _id : item.sessionId }*/ ) );
    posts.forEach(  item => Posts.insert(  item/*, { _id : item.id }*/ ) );

    // Events.insert( events );
    // Posts.insert( posts );
}

// Publish generic collection -- split out into new publications file
Meteor.publish( 'social.public', function() {
  Meteor._sleepForMs( 2000 );
  const entries = Social.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );

Meteor.publish( 'events.public', function() {
  Meteor._sleepForMs( 2000 );
  const entries = Events.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );

Meteor.publish( 'posts.public', function() {
  Meteor._sleepForMs( 2000 );
  const entries = Posts.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );

poll( );

Meteor.setInterval( poll, POLL_INTERVAL );
