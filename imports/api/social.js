// import { Meteor } from 'meteor/meteor';
// import { Mongo }  from 'meteor/mongo';
// import { SOCIAL } from './endpoints';
//
// export const Social = new Mongo.Collection( 'social' );
//
// const INTERVAL = 5000;
// const OPTIONS  = {};
//
// if ( Meteor.isServer ) {
//     Meteor.publish(
//         'social',
//         function( ) {
//             try {
//                 var response = HTTP.get( SOCIAL, OPTIONS );
//
//                 response.data.items.forEach(
//                     item => {
//                         let post = {
//                             id: item.id
//                         };
//
//                         this.added( 'posts', Random.id(), post );
//                     }
//                 );
//
//                 this.ready();
//             } catch ( e ) { console.error( e ) };
//         }
//     );
// }
//
// Meteor.methods( {
//     isUrl: function( url ) {
//         return /^https?:\/\//.test( url );
//     }
// } );
