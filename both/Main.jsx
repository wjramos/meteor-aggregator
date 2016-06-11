// import { Meteor } from 'meteor/meteor';
// import React, { Component, PropTypes } from 'react';
// import { createContainer } from 'meteor/react-meteor-data';
//
// // import { Tiles } from '../../lib/collections';
//
// // import Header from './Header.jsx';
// // import Nav    from './Nav.jsx';
// // import Grid   from './Grid.jsx';
//
// class MainLayout extends Component {
//   render ( header, nav, grid ) {
//     return (
//       <section>
//         { header }
//         { nav }
//         { grid }
//         {/*<Header />
//         <Nav tiles = { this.props.tiles }
//              className = { 'container-fluid overlay-dark-2' } />
//         <Grid tiles = { this.props.tiles }
//               className = { 'container-fluid' }
//               id = { 'main' } />*/}
//       </section>
//     );
//   }
// }
//
// MainLayout.propTypes = {
//   // tiles: PropTypes.array
// };
//
// export default createContainer(
//   ( ) => {
//       // Meteor.subscribe( 'tiles' );
//
//       return {
//         // tiles: Tiles.find( {}, { sort: { relTimestamp: 1 } } ).fetch()
//       };
//   },
//   MainLayout
// );
