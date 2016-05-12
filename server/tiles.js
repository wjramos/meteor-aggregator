// import { Meteor } from 'meteor/meteor';
// import { Mongo }  from 'meteor/mongo';
// import { check }  from 'meteor/check';
// import { Social } from './social';
//
// export const Tiles = new Mongo.Collection( 'tiles' );
//
// Social.helpers( {
//     author ( ) {
//       return this.user.username;
//     }
//     image
// } );
//
//   // This code only runs on the server
//   // Only publish tiles that are public or belong to the current user
//   Meteor.publish(
//     'tiles',
//     ( ) => {
//       // let events = Events.find().fetch();
//       // let posts  = Posts.find().fetch();
//       // let social = Social.find().fetch();
//
//       // let docs = events.concat( posts ).concat( social );
//       // return _.sortBy( docs, doc => doc.createdAt );
//       // return social;
//       // return Tiles.find( {
//       //   $or: [
//       //     {
//       //       published: {
//       //         $ne: true
//       //       }
//       //     },
//       //     {
//       //       owner: this.userId
//       //     }
//       //   ]
//       // } );
//     }
//   );
// //
// // Meteor.methods( {
// //   'tiles.insert'( text ) {
// //     check( text, String );
// //
// //     // Make sure the user is logged in before inserting a tile
// //     if ( ! this.userId ) {
// //       throw new Meteor.Error( 'not-authorized' );
// //     }
// //
// //     Tiles.insert( {
// //       text,
// //       createdAt: new Date( ),
// //       owner:     this.userId,
// //       username:  Meteor.users.findOne( this.userId ).username,
// //     } );
// //   },
// //   'tiles.remove'( tileId ) {
// //     check( tileId, String );
// //
// //     const tile = Tiles.findOne( tileId );
// //     if ( tile.private && tile.owner !== this.userId ) {
// //       // If the tile is private, make sure only the owner can delete it
// //       throw new Meteor.Error( 'not-authorized' );
// //     }
// //
// //     Tiles.remove( tileId );
// //   },
// //   'tiles.setToPublished'( tileId, setToPublished ) {
// //     check( tileId, String );
// //     check( setToPublished, Boolean );
// //
// //     const tile = Tiles.findOne( tileId );
// //
// //     // Make sure only the tile owner can make a tile published
// //     if ( tile.owner !== this.userId ) {
// //       throw new Meteor.Error( 'not-authorized' );
// //     }
// //
// //     Tiles.update(
// //       tileId, {
// //         $set: {
// //           published: setToPublished
// //         }
// //       }
// //     );
// //   },
// // });
