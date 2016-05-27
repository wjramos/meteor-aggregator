const TileSubs = new SubsManager();

FlowRouter.route( '/', {
  name: 'App',
  subscriptions: function( params, queryParams ) {
    this.register( 'tiles', TileSubs.subscribe( 'tiles.public' ) );
  }
} );

FlowRouter.route( '/health', {
  name: 'Health'
//
//   this.response.statusCode = 200;
//   this.response.end( this.response.statusCode.toString() );
} );
