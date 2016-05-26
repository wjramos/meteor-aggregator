import { Meteor } from 'meteor/meteor';
import { HTTP }   from 'meteor/http';
import { check }  from 'meteor/check';

import { Tiles } from '../lib/collections';

import { months } from '../imports/months';
import { config } from '../imports/tile-config';

_ = lodash;

const TRUNCATE_LENGTH = 360;

Meteor.methods( {

  getDateStr ( tile ) {
    check( tile, Match.Any );

    const startDate = new Date( tile.start );
    const endDate   = new Date( tile.end );
    let start;
    let end;
    let date = '';

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


  truncateText ( text, length = 360 ) {
    check( text,   String );
    check( length, Number );
    return `<p>${ _.truncate( text,
      {
        'length': length,
        'separator': /,? +/,
        'omission': ' […]<br><span class = "position bottom right btn btn-text">Read More</span>'
      }
    ) }</p>`;
  },


  getMedia ( mediaObj ) {
    check( mediaObj, Object );

    let media = [];

    Object.keys( mediaObj ).forEach(
      key => media.push( mediaObj[ key ] )
    );

    return media;
  },


  mapSocial ( tile ) {
    check( tile, Match.Any );

    const now = Date.parse( new Date( ) );
    const timestamp = tile.timestamp * 1000;

    return {
      type:         'social',
      key:          tile.id,
      relTimestamp: Math.abs( timestamp - now ),
      title:        tile.user.username,
      link:         tile.url,
      caption:      Meteor.call( 'truncateText', tile.caption, TRUNCATE_LENGTH ),
      media:        Meteor.call( 'getMedia', tile.photo ),
      config,
      timestamp
    };
  },


  mapEvent ( tile ) {
    check( tile, Match.Any );

    const now       = Date.parse( new Date( ) );
    const timestamp = Date.parse( tile.start );

    return {
      type:         tile.registration.status === 'NOT_REQUIRED' ? 'event' : 'activity',
      subtype:      tile.activityType && tile.activityType.program ? tile.activityType.program.name : '',
      key:          tile.sessionId,
      relTimestamp: Math.abs( timestamp - now ),
      label:        Meteor.call( 'getDateStr', tile ),
      title:        tile.title,
      link:         `https://rei.com${ tile.uri }`,
      caption:      Meteor.call( 'truncateText', tile.summary, TRUNCATE_LENGTH ),
      badge:        tile.registration.status,

      // Replace when images added to service
      media:        Meteor.call( 'getMedia', { placeholder: { url: '/img/test.jpg' } } ),
      config,
      timestamp
    };
  },


  mapPost ( tile ) {
    check( tile, Match.Any );

    const now       = Date.parse( new Date( ) );
    const timestamp = Date.parse( tile.date );

    return {
      type:         'blog',
      key:          tile.id,
      relTimestamp: Math.abs( timestamp - now ),
      label:        'blog',
      title:        tile.title,
      link:         tile.url,
      caption:      Meteor.call( 'truncateText', tile.excerpt, TRUNCATE_LENGTH ),
      media:        Meteor.call( 'getMedia', tile.attachments[0].images ),
      config,
      timestamp
    };
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
