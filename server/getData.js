import { Meteor } from 'meteor/meteor';
import { Mongo }  from 'meteor/mongo';

Meteor.methods( {

  getData ( ENDPOINT, QUERY ) {
    let response;

    this.unblock();

    try {
      console.log( `\n::::::: Retrieving Data :::::::\n`,
                   `Endpoint: ${ ENDPOINT }\n`,
                   `Query:`
                 );
      for( let PARAM in QUERY.params ) {
        console.log( `\t${ PARAM } : ${ QUERY.params[ PARAM ] }`);
      }
      response = HTTP.get(
        ENDPOINT,
        QUERY
      );

      console.log( `\n**** Result ****\n`, `\tSUCCESS`);

      return response.data;

    } catch ( e ) {
      console.log( `\n**** Result ****\n`, `\tERROR\n`, e );
    }
  }

} );
