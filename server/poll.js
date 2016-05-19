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
    // TODO: Apply Schema, consolidate and sort into a proxy collection, only update on new items
    if ( social.length ) {
      Social.remove( {} );
      social.forEach( item => Social.insert( item/*, { _id : item.id }*/ ) );
    }

    if ( events.length ) {
      Events.remove( {} );
      events.forEach( item => Events.insert( item/*, { _id : item.sessionId }*/ ) );
    }

    if ( posts.length ) {
      Posts.remove( {} );
      posts.forEach(  item => Posts.insert(  item/*, { _id : item.id }*/ ) );
    }
}

// Publish generic collection -- split out into new publications file
Meteor.publish( 'social.public', function() {
  // Meteor._sleepForMs( 2000 );
  const entries = Social.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );

Meteor.publish( 'events.public', function() {
  // Meteor._sleepForMs( 2000 );
  const entries = Events.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );

Meteor.publish( 'posts.public', function() {
  // Meteor._sleepForMs( 2000 );
  const entries = Posts.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );

poll( );

Meteor.setInterval( poll, POLL_INTERVAL );
