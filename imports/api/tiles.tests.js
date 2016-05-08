/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tiles }  from './tiles';

if ( Meteor.isServer ) {
    xdescribe( 'Tiles', () => {
        describe( 'methods', () => {
            const userId = Random.id();
            let tileId;

            beforeEach( () => {
                Tiles.remove( {} );
                tileId = Tiles.insert( {
                    text:      'test tile',
                    createdAt: new Date(),
                    owner:     userId,
                    username:  'tmeasday',
                } );
            } );

            it( 'can delete owned tile', () => {
                // Find the internal implementation of the tile method so we can
                // test it in isolation
                const deleteTile = Meteor.server.method_handlers[ 'tiles.remove' ];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                deleteTile.apply( invocation, [ tileId ] );

                // Verify that the method does what we expected
                assert.equal( Tiles.find().count(), 0 );
            } );
        } );
    } );
}
