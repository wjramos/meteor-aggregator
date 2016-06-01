import { Mongo }  from 'meteor/mongo';
import { TileSchema } from './schemas';

export const Tiles = new Mongo.Collection( 'tiles' );
Tiles.attachSchema( TileSchema );

// Tiles.helpers( {
//     getAll ( ) {
//         return this.find( {}, { sort: { relTimestamp: 1 } } );
//     },
//     getSocial ( ) {},
//     getPosts ( ) {},
//     getActivities ( ) {},
//     getEvents ( ) {}
// } );
