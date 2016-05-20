import { Mongo }  from 'meteor/mongo';
import { TileSchema } from './schemas';

export const Tiles = new Mongo.Collection( 'tiles' );
Tiles.attachSchema( TileSchema );
