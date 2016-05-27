Router.route( 'health', function() {
  this.response.statusCode = 200;
  this.response.end( this.response.statusCode.toString() );
}, { where: 'server' } );
