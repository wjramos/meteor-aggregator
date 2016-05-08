import { Meteor } from 'meteor/meteor';
import { Mongo }  from 'meteor/mongo';
import { check }  from 'meteor/check';
import { Social } from './social';

export const Tiles = new Mongo.Collection( 'tiles' );
