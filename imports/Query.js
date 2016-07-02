export default class Query {
  constructor ( config ) {
    this.endpoint  = config.endpoint;
    this.mapMethod = config.mapMethod;
    this.property  = config.property;
    this.query     = config.query;
    this.results   = [];
    this.interval  = null;

    this.resolve( );

    return this;
  }

  resolve ( ) {
    Meteor.call( 'getData', this.endpoint, this.query, this.property ).map(
      result => !_.some( this.results, [ 'key', result.key ] ) ? this.results.push( Meteor.call( this.mapMethod, result ) ) : null
    );

    return this;
  }

  poll ( interval = 300000 ) {
    // Resolve immediately if no data
    if ( this.results.length < 1 ) {
      this.resolve();
    }

    this.interval = Meteor.setInterval( this.resolve, interval );

    return this;
  }

  stop ( ) {
    Meteor.clearInterval( this.interval );

    return this;
  }

  reset ( ) {
    this.results = [];

    return this;
  }
}
