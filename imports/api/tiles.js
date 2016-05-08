import { Meteor } from 'meteor/meteor';
import { Mongo }  from 'meteor/mongo';
import { check }  from 'meteor/check';

export const Tiles = new Mongo.Collection( 'tiles' );

if ( Meteor.isServer ) {
  // This code only runs on the server
  // Only publish tiles that are public or belong to the current user
  Meteor.publish(
    'tiles',
    function tilesPublication( ) {
      return Tiles.find( {
        $or: [
          {
            private: {
              $ne: true
            }
          },
          {
            owner: this.userId
          },
        ],
      } );
    }
  );
}

Meteor.methods( {
  'tiles.insert'( text ) {
    check( text, String );

    // Make sure the user is logged in before inserting a tile
    if ( ! this.userId ) {
      throw new Meteor.Error( 'not-authorized' );
    }

    Tiles.insert( {
      text,
      createdAt: new Date( ),
      owner:     this.userId,
      username:  Meteor.users.findOne( this.userId ).username,
    } );
  },
  'tiles.remove'( tileId ) {
    check( tileId, String );

    const tile = Tiles.findOne( tileId );
    if ( tile.private && tile.owner !== this.userId ) {
      // If the tile is private, make sure only the owner can delete it
      throw new Meteor.Error( 'not-authorized' );
    }

    Tiles.remove( tileId );
  },
  'tiles.setToPublished'( tileId, setToPublished ) {
    check( tileId, String );
    check( setToPublished, Boolean );

    const tile = Tiles.findOne( tileId );

    // Make sure only the tile owner can make a tile published
    if ( tile.owner !== this.userId ) {
      throw new Meteor.Error( 'not-authorized' );
    }

    Tiles.update(
      tileId, {
        $set: {
          published: setToPublished
        }
      }
    );
  },
});
