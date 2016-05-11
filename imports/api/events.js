// import { Meteor } from 'meteor/meteor';
// import { Mongo }  from 'meteor/mongo';
// import { EVENTS } from './endpoints';
//
// const INTERVAL = 5000;
// const OPTIONS       = {
//     sortBy:        'date',
//     sortDirection: 'asc',
//     offset:        0,
//     limit:         20,
//     distance:      50,
//     location:      20500,
//     // sa:            'Adventure',
//     // ca:            'Women Only'
// };
// export const Events = new Mongo.Collection( 'events' );
//
// if ( Meteor.isServer ) {
//     Meteor.publish(
//         'events', () => {
//         const publishedKeys = {};
//
//         const poll = () => {
//             // Let's assume the data comes back as an array of JSON documents, with an _id field, for simplicity
//             const data = HTTP.get( EVENTS, OPTIONS );
// console.log( data )
//             data.events.forEach(
//                 event => {
//                     if ( publishedKeys[ event.sessionId ] ) {
//                         this.changed( 'events', event.sessionId, event );
//                     } else {
//                         publishedKeys[ event.sessionId ] = true;
//
//                         if ( publishedKeys[ event.sessionId ] ) {
//                             this.added( 'events', event.sessionId, event );
//                         }
//                     }
//                 }
//             );
//         };
//
//         poll();
//         this.ready();
//
//         const interval = Meteor.setInterval( poll, INTERVAL );
//
//         this.onStop( () => {
//             Meteor.clearInterval( interval );
//         } );
//     } );
// }
