import './poll';

if ( Meteor.getEnvironment === 'dev' ) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

Meteor.methods( {
  getEnvironment ( ) {
    if ( process.env.ROOT_URL.includes( 'localhost' ) ) {
      return 'dev';
    }

    return 'prod';
  }
} );
