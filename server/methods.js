import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';

Meteor.methods( {

  mapSocial ( tile ) {
    check( tile, Match.Any );

    const SocialMap = {
      type:      'social',
      key:       tile.id,
      timestamp: tile.timestamp,
      title:     tile.user.username,
      link:      tile.url,
      caption:   tile.caption,
      media:     []
    };

    Object.keys( tile.photo ).forEach( key => SocialMap.media.push( tile.photo[ key ] ) );

    return SocialMap;
  },

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

      Object.keys( query.params ).forEach( param => console.log( `\t${ param } : ${ query.params[ param ] }` ) );

      response = HTTP.get(
        endpoint,
        query
      );
      console.log( `\n**** Result ****\n`, `\tSUCCESS` );

      return response.data;

    } catch ( e ) {
      console.log( `\n**** Result ****\n`, `\tERROR - ${ e.code }` );
    }
  }
} );
