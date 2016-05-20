import { Mongo }  from 'meteor/mongo';
import { TileSchema } from './schemas';

export const Events = new Mongo.Collection( 'events' );
export const Posts  = new Mongo.Collection( 'posts' );
export const Social = new Mongo.Collection( 'social' );

export const Tiles  = new Mongo.Collection( 'tiles' ).attachSchema( TileSchema );
