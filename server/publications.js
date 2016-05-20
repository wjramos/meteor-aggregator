import { Meteor } from 'meteor/meteor';
import { Tiles } from '../lib/collections';

// Publish generic collection -- split out into new publications file
Meteor.publish( 'tiles.public', ( ) => {
  const entries = Tiles.find( );
  if ( entries ) {
    return entries;
  }

  return this.ready();
} );
