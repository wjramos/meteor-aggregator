// import { Mongo }  from 'meteor/mongo';
//
// import WP from 'wordpress-rest-api';
// import endpoints from './endpoints';
//
// export const Posts = new Mongo.Collection( 'blog' );
//
// function getPosts ( endpoint, resolve ) {
//     const blog = new WP( { endpoint: endpoint } );
//
//     // Promises
//     blog.posts( )
//     .then(
//         data => {
//             Posts.insert( data );
//             return resolve( );
//         }
//     ).catch(
//         err => {
//             console.error( err );
//         }
//     );
// }
//
// let requests = endpoints.wp.map(
//     endpoint => new Promise(
//         resolve => getPosts( endpoint, resolve )
//     )
// );
//
// Promise.all( requests );
