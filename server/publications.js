import { Meteor } from 'meteor/meteor';
import { INTERVAL, SOCIAL } from './endpoints';

Meteor.publish(
  'tiles',
  ( ) => {
    // let events = Events.find().fetch();
    // let posts  = Posts.find().fetch();
    let social = Social.find().fetch();

    // let docs = events.concat( posts ).concat( social );
    // return _.sortBy( docs, doc => doc.createdAt );
    return social;
    // return Tiles.find( {
    //   $or: [
    //     {
    //       published: {
    //         $ne: true
    //       }
    //     },
    //     {
    //       owner: this.userId
    //     }
    //   ]
    // } );
  }
);

Meteor.publish(
  'social',
  () => {
    const publishedKeys = {};

    const poll = () => {
        // Let's assume the data comes back as an array of JSON documents, with an _id field, for simplicity
        const data = HTTP.get( SOCIAL, OPTIONS );

        data.items.forEach(
            event => {
                if ( publishedKeys[ event.id ] ) {
                    this.changed( 'social', event.id, event );
                } else {
                    publishedKeys[ event.id ] = true;

                    if ( publishedKeys[ event.id ] ) {
                        this.added( 'social', event.id, event );
                    }
                }
            }
        );
    };

    poll();
    this.ready();

    const interval = Meteor.setInterval( poll, INTERVAL );

    this.onStop( () => {
        Meteor.clearInterval( interval );
    } );
  }
);
//
// Meteor.publish(
//   'events',
//   () => {
//     const publishedKeys = {};
//
//     const poll = () => {
//         // Let's assume the data comes back as an array of JSON documents, with an _id field, for simplicity
//         const data = HTTP.get( EVENTS, OPTIONS );
//
//         data.events.forEach(
//             event => {
//                 if ( publishedKeys[ event.sessionId ] ) {
//                     this.changed( 'events', event.sessionId, event );
//                 } else {
//                     publishedKeys[ event.sessionId ] = true;
//
//                     if ( publishedKeys[ event.sessionId ] ) {
//                         this.added( 'events', event.sessionId, event );
//                     }
//                 }
//             }
//         );
//     };
//
//     poll();
//     this.ready();
//
//     const interval = Meteor.setInterval( poll, INTERVAL );
//
//     this.onStop( () => {
//         Meteor.clearInterval( interval );
//     } );
//   }
// );
