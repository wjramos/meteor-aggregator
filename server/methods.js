import { Meteor } from 'meteor/meteor';
import { HTTP }   from 'meteor/http';
import { check }  from 'meteor/check';

import { Tiles } from '../lib/collections';

import { months } from '../imports/months';
import { config } from '../imports/tile-config';

_ = lodash;

const TRUNCATE_LENGTH = 360;
Meteor.methods( {

  poll ( interval, endpoint, query, map, property, Collection = Tiles ) {
    const curEntries = Tiles.find( ).fetch( );
    const now = Date.parse( new Date( ) );
    let retrievedCount = 0;

    console.log( '---- Poll ----\n',`\tInitial Tiles collection size: ${ curEntries.length } tiles` );

    function retrieveData ( ) {
      let data = Meteor.call( 'getData', endpoint, query, property );
      console.log( `Found ${ data.length } items – Mapping and inserting using ${ map } schema adaptor...` );
      retrievedCount += data.length;
      return data ? Meteor.call( 'upsert', applyMap( data ) ) : [];
    }

    function applyMap( items ) {
      return items.map(
        item => {
          item = Meteor.call( map, item );
          item.relTimestamp = Meteor.call( 'getTimestampDiff', item.timestamp, now );
          return item;
        }
      );
    }

    if ( curEntries.length < 1 ) {
      console.log( 'No data in collection, retrieving initial set...' );
      retrieveData();
    }

    Meteor.setInterval( retrieveData, interval );

    /* Result Reporting */
    const updatedEntries = Tiles.find( ).fetch( );
    const difference     = updatedEntries.length - curEntries.length;
    console.log(
      `\n\nNew Tiles collection size:
       ${ updatedEntries.length } tiles ( ${ difference } new, ${ retrievedCount - difference } updated )\n`
    );
  },

  getDateStr ( start, end ) {
    check( start, Match.Any );
    check( end, Match.Any );

    let startObj;
    let endObj;
    let date = '';

    if ( start ) {
      const startDate = new Date( start );
      startObj = {
        date:  startDate.getDate(),
        month: months[ startDate.getMonth() ]
      };

      date += `${ startObj.month } ${ startObj.date }`;
    }

    if ( end && end !== start ) {
      const endDate   = new Date( end );
      endObj = {
        date:  endDate.getDate(),
        month: months[ endDate.getMonth() ]
      };

      if ( endObj.month !== startObj.month || endObj.date !== startObj.date ) {
        date += ' - ';
      }

      if ( endObj.month !== startObj.month ) {
        date += endObj.month + ' ';
      }

      if ( endObj.date !== startObj.date ) {
        date += endObj.date;
      }
    }

    return date;
  },

  getTimestampDiff ( timestamp, reference ) {
    /* Assuming the same data is retrieved, this will recalculate on upsert */
    return Math.abs( timestamp - reference );
  },

  getUniqueValues ( collection, key ) {
    return collection.reduce( ( carry, item ) => {
      if ( item[ key ] && !~carry.indexOf( item[ key ] ) ) {
        carry.push( item[ key ] );
      }

      return carry;

    }, [] ).sort();
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

    const timestamp = tile.timestamp * 1000;

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


  mapEvent ( tile ) {
    check( tile, Match.Any );

    const timestamp = Date.parse( tile.start );

    return {
      key:          tile.sessionId,
      timestamp:    Date.parse( tile.start ),
      type:         'activity',
      activityType: tile.activityType && tile.activityType.program ? tile.activityType.program.name : '',
      title:        tile.title,
      link:         `https://rei.com${ tile.uri }`,
      caption:      tile.summary ? Meteor.call( 'truncateText', tile.summary, TRUNCATE_LENGTH ) : null,
      badge:        tile.registration.status === 'WAIT_LIST' ? 'Full – get notified' : null,
      label:        Meteor.call( 'getDateStr', tile.start, tile.end ),

      // Replace when images added to service
      media:        Meteor.call( 'getMedia', { placeholder: { url: '/img/test.jpg' } } )
    };
  },


  mapPost ( tile ) {
    check( tile, Match.Any );

    const timestamp = Date.parse( tile.date );

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


  getData ( endpoint, query, property ) {
    check( endpoint, Match.Any );
    check( query, Match.Any );
    check( property, Match.Any );

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

      return response.data[ property ];

    } catch ( e ) {
      console.log( `\n**** Result ****\n`, `\tERROR - CODE: ${ e.code }\n` );

      return false;
    }
  },


  upsert ( tiles, Collection = Tiles ) {
    check( tiles, Match.Any );
    if ( tiles ) {
      return tiles.forEach(
        tile => {
          Collection.update(
            { _id:    tile.key },
            { $set:   tile },
            { upsert: true }
          );
        }
      );
    }
  },
} );
