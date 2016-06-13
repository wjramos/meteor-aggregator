import { Meteor } from 'meteor/meteor';
import { HTTP }   from 'meteor/http';
import { check }  from 'meteor/check';

import { Tiles } from '../lib/collections';

import { months } from '../imports/months';
import { config } from '../imports/tile-config';

_ = lodash;

const TRUNCATE_LENGTH = 360;

Meteor.methods( {

  getDateStr ( start = 0, end = 0 ) {
    check( start, Number );
    check( end,   Number );

    let startObj;
    let endObj;
    let dateStr = '';

    if ( start ) {
      const startDate = new Date( start );
      startObj = {
        date:  startDate.getDate(),
        month: months[ startDate.getMonth() ]
      };

      dateStr += `${ startObj.month } ${ startObj.date }`;
    }

    if ( end && end > start ) {
      const endDate = new Date( end );
      endObj = {
        date:  endDate.getDate(),
        month: months[ endDate.getMonth() ]
      };

      if ( endObj.month !== startObj.month || endObj.date !== startObj.date ) {
        dateStr += ' - ';
      }

      if ( endObj.month !== startObj.month ) {
        dateStr += endObj.month + ' ';
      }

      if ( endObj.date !== startObj.date ) {
        dateStr += endObj.date;
      }
    }

    return dateStr;
  },


  getTimestampDiff ( timestamp = 0, reference = 0 ) {
    check( timestamp, Number );
    check( reference, Number );

    /* Assuming the same data is retrieved, this will recalculate on upsert */
    return Math.abs( timestamp - reference );
  },


  truncateText ( text = '', length = 360 ) {
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


  getMedia ( mediaObj = {} ) {
    check( mediaObj, Object );

    let media = [];

    Object.keys( mediaObj ).forEach(
      key => media.push( mediaObj[ key ] )
    );

    return media;
  },


  mapSocial ( tile = {} ) {
    check( tile, Object );

    if ( tile.url ) {
      return {
        key:          tile.id,
        timestamp:    tile.timestamp * 1000,
        type:         'social',
        title:        tile.user.username,
        link:         tile.url,
        caption:      tile.caption ? Meteor.call( 'truncateText', tile.caption, TRUNCATE_LENGTH ) : null,
        media:        tile.photo ? Meteor.call( 'getMedia', tile.photo ) : null,
      };
    }

    return {
      key:          tile.id,
      timestamp:    tile.timestamp * 1000,
      type:         'photo',
      media:        tile.photo ? [ tile.photo.original ] : null //Meteor.call( 'getMedia', tile.photo ) : null
    };
  },


  mapEvent ( tile = {} ) {
    check( tile, Object );

    return {
      key:          tile.sessionId,
      timestamp:    Date.parse( tile.start ),
      type:         'activity',
      activityType: tile.activityType && tile.activityType.program ? tile.activityType.program.name : '',
      title:        tile.title,
      link:         `https://rei.com${ tile.uri }`,
      caption:      tile.summary ? Meteor.call( 'truncateText', tile.summary, TRUNCATE_LENGTH ) : null,
      badge:        tile.registration.status === 'WAIT_LIST' ? 'Full – get notified' : null,
      label:        Meteor.call( 'getDateStr', Date.parse( tile.start ), Date.parse( tile.end ) ),

      // Replace when images added to service
      media:        Meteor.call( 'getMedia', { placeholder: { url: '/img/test.jpg' } } )
    };
  },


  mapPost ( tile = {} ) {
    check( tile, Object );

    return {
      key:          tile.id,
      timestamp:    Date.parse( tile.date ),
      type:         'blog',
      title:        tile.title,
      label:        'blog',
      link:         tile.url,
      caption:      tile.excerpt ? Meteor.call( 'truncateText', tile.excerpt, TRUNCATE_LENGTH ) : '',
      media:        tile.attachments[0] ? Meteor.call( 'getMedia', tile.attachments[0].images ) : []
    };
  },


  getData ( endpoint = '', query = {} ) {
    check( endpoint, String );
    check( query,    Object );

    let response;

    this.unblock();

    try {
      console.log( `\n::::::: Retrieving Data :::::::\n`,
                   `Endpoint: ${ endpoint }\n`,
                   `Query:`
                 );

      Object.keys( query ).forEach( param => console.log( `\t${ param } : ${ query[ param ] }` ) );

      response = HTTP.get(
        endpoint,
        {
          params:  query,
          timeout: 4000
        }
      );
      console.log( `\n**** Result ****\n`, `\tSUCCESS\n` );

      return response.data;

    } catch ( e ) {
      console.log( `\n**** Result ****\n`, `\tERROR - CODE: ${ e.code }\n` );

      return false;
    }
  },


  upsert ( items = [], map = '' ) {
    check( items, Array );
    check( map,   String );

    if ( items ) {
      console.log( `Found ${ items.length } items – Mapping and inserting using ${ map } schema adaptor...` );
      const now = Date.parse( new Date( ) );

      return items.forEach(
        tile => {
          const mapped = Meteor.call( map, tile );
          mapped.relTimestamp = Meteor.call( 'getTimestampDiff', mapped.timestamp, now );

          Tiles.update(
            { _id:    mapped.key },
            { $set:   mapped },
            { upsert: true }
          );
        }
      );
    }
  },
} );
