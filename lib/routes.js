const TileSubs = new SubsManager();

import { mount } from 'react-mounter';
// load Layout and Welcome React components
import { App } from '../client/views/App.jsx';
// import { Header } from '../client/views/Header.jsx';
//
//
// FlowRouter.route( '/', {
//   name: 'App',
//   action ( ) {
//     mount( App, {
//       content: (
//         <Header />
//       )
//     } );
//   },
//   subscriptions: function( params, queryParams ) {
//     this.register( 'tiles', TileSubs.subscribe( 'tiles.public' ) );
//   }
// } );

FlowRouter.route( '/health', {
  name: 'Health'
//
//   this.response.statusCode = 200;
//   this.response.end( this.response.statusCode.toString() );
} );
