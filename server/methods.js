import { Meteor } from 'meteor/meteor';
import { HTTP }   from 'meteor/http';
import { check }  from 'meteor/check';

import { Tiles } from '../lib/collections';

import { months } from '../imports/months';
import { config } from '../imports/tile-config';

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

    const now = Date.parse( new Date( ) );
    const timestamp = tile.timestamp * 1000;
    const SocialMap = {
      type:         'social',
      key:          tile.id,
      relTimestamp: Math.abs( timestamp - now ),
      title:        tile.user.username,
      link:         tile.url,
      caption:      tile.caption,
      media:        [],
      config,
      timestamp
    };

    Object.keys( tile.photo ).forEach(
      key => SocialMap.media.push( tile.photo[ key ] )
    );

    return SocialMap;
  },

  mapEvent ( tile ) {
    check( tile, Match.Any );

    const now = Date.parse( new Date( ) );
    const timestamp = Date.parse( tile.start );
    const EventMap = {
      type:         'events',
      key:          tile.sessionId,
      relTimestamp: Math.abs( timestamp - now ),
      label:        Meteor.call( 'getDateStr', tile ),
      title:        tile.title,
      link:         `https://rei.com${ tile.uri }`,
      caption:      tile.summary,
      badge:        tile.registration.status,

      // Replace when images added to service
      media:        [ { url: 'https://placehold.it/350x150' } ],
      config,
      timestamp
    };

    // Use this when images provided by response
    // Object.keys( tile.photo ).forEach(
    //   key => EventMap.media.push( tile.photo[ key ] )
    // );

    return EventMap;
  },

  mapPost ( tile ) {
    check( tile, Match.Any );

    const now = Date.parse( new Date( ) );
    const timestamp = Date.parse( tile.date );
    const PostMap = {
      type:         'blog',
      key:          tile.id,
      relTimestamp: Math.abs( timestamp - now ),
      label:        'blog',
      title:        tile.title,
      link:         tile.url,
      caption:      tile.excerpt,
      media:        [],
      config,
      timestamp
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
      console.log( `Mapping and inserting ${ items.length } tiles using ${ map } schema adaptor...` );
      return items.forEach(
        tile => {
          const mapped = Meteor.call( map, tile );

          Tiles.update(
            { _id:    mapped.key },
            { $set:   mapped },
            { upsert: true }
          );
        }
      );
    }
  },


  getData ( endpoint, query ) {
    check( endpoint, Match.Any );
    check( query, Match.Any );

    let response;

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
      console.log( `\n**** Result ****\n`, `\tSUCCESS\n` );

      return response.data;

    } catch ( e ) {
      console.log( `\n**** Result ****\n`, `\tERROR - CODE: ${ e.code }\n` );

      return false;
    }
  }
} );
