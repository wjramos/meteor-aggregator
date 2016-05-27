import { Meteor } from 'meteor/meteor';
import { Tiles } from '../lib/collections';

// Publish collections for consuming client-side
Meteor.publish( 'tiles.public', ( ) => {
  const entries = Tiles.find( );

  if ( entries ) {
    return entries;
  }

  return this.ready();
} );
