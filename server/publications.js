import { Meteor } from 'meteor/meteor';
import { /*Events, Posts, Social, */Tiles } from '../lib/collections';

// Publish generic collection -- split out into new publications file
Meteor.publish( 'tiles.public', ( ) => {
  const entries = Tiles.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );
// Meteor.publish( 'social.public', ( ) => {
//   const entries = Social.find( );
//   if ( entries ) {
//     return entries;
//   }
//
//   return this.ready();
// } );
//
// Meteor.publish( 'events.public', ( ) => {
//   const entries = Events.find( );
//   if ( entries ) {
//     return entries;
//   }
//
//   return this.ready();
// } );
//
// Meteor.publish( 'posts.public', ( ) => {
//   const entries = Posts.find( );
//   if ( entries ) {
//     return entries;
//   }
//
//   return this.ready();
// } );
