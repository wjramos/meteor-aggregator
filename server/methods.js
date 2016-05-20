import { Meteor } from 'meteor/meteor';
import { HTTP }   from 'meteor/http';
import { check }  from 'meteor/check';

import { Tiles } from '../lib/collections';

import { months } from '../imports/months';

Meteor.methods( {

  getDateStr ( tile ) {
    const startDate = new Date( tile.start );
    const endDate   = new Date( tile.end );
    let start;
    let end;
    let date = '';

    check( tile, Match.Any );

    if ( tile.start ) {
      start = {
        date:  startDate.getDate(),
        month: months[ startDate.getMonth() ]
      };

      date += `${ start.month } ${ start.date }`;
    }

    if ( tile.end ) {
      end = {
        date:  endDate.getDate(),
        month: months[ endDate.getMonth() ]
      };

      if ( end.month !== start.month || end.date !== start.date ) {
        date += ' - ';
      }
      if ( end.month !== start.month ) {
        date += `${ end.month } `;
      }

      if ( end.date !== start.date ) {
        date += end.date;
      }
    }

    return date;
  },

  mapSocial ( tile ) {
    check( tile, Match.Any );

    const SocialMap = {
      type:      'social',
      key:       tile.id,
      timestamp: tile.timestamp * 1000,
      title:     tile.user.username,
      link:      tile.url,
      caption:   tile.caption,
      media:     []
    };

    Object.keys( tile.photo ).forEach(
      key => SocialMap.media.push( tile.photo[ key ] )
    );

    return SocialMap;
  },

  mapEvent ( tile ) {
    check( tile, Match.Any );

    const EventMap = {
      type      : 'events',
      key       : tile.sessionId,
      timestamp : Date.parse( tile.start ),
      label     : Meteor.call( 'getDateStr', tile ),
      title     : tile.title,
      link      : 'https://rei.com' + tile.uri,
      caption   : tile.summary,
      badge     : tile.registration.status,

      // Replace when images added to service
      media     : [ { url: 'https://placehold.it/350x150' } ]
    };

    // Object.keys( tile.photo ).forEach(
    //   key => EventMap.media.push( tile.photo[ key ] )
    // );

    return EventMap;
  },

  mapPost ( tile ) {
    check( tile, Match.Any );

    const PostMap = {
      type      : 'blog',
      key       : tile.id,
      timestamp : Date.parse( tile.date ),
      label     : 'blog',
      title     : tile.title,
      link      : tile.url,
      caption   : tile.excerpt,
      media     : []
    };

    Object.keys( tile.attachments[0].images ).forEach(
      key => PostMap.media.push( tile.attachments[0].images[ key ] )
    );

    return PostMap;
  },


  upsert ( items, map ) {
    check( items, Match.Any );
    check( map, Match.Any );

    if ( items ) {
      console.log( `\nMapping and inserting ${ items.length } tiles using ${ map }...\n` );
      return items.forEach(
        tile => Tiles.update(
          { key:    map === 'mapEvent' ? tile.sessionId : tile.id },
          { $set:   Meteor.call( map, tile ) },
          { upsert: true }
        )
      );
    }

    return [];
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

      return false;
    }
  }
} );
