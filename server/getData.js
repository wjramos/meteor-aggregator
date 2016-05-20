import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';

Meteor.methods( {

  getData ( endpoint, query ) {
    let response;
    check( endpoint, Match.Any );
    check( query, Match.Any );

    this.unblock();

    try {
      console.log( `\n::::::: Retrieving Data :::::::\n`,
                   `Endpoint: ${ endpoint }\n`,
                   `Query:`
                 );
      query.params.keys.forEach( param => console.log( `\t${ param } : ${ query.params[ param ] }`) );

      response = HTTP.get(
        endpoint,
        query
      );

      console.log( `\n**** Result ****\n`, `\tSUCCESS`);

      return response.data;

    } catch ( e ) {
      console.log( `\n**** Result ****\n`, `\tERROR - ${ e.code }` );
    }

    return false;
  }
} );
