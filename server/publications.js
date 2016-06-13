import { Meteor } from 'meteor/meteor';
import { Tiles } from '../lib/collections';

// Publish collections for consuming client-side
Meteor.publish( 'tiles', ( ) => {
  const selector = {};
  const sort = { sort: { relTimestamp: 1 } };
  
  const entries = Tiles.find( selector, sort );

  if ( entries ) {
    return entries;
  }

  return this.ready();
} );
