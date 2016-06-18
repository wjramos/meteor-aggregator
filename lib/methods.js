import { Meteor } from 'meteor/meteor';
import { HTTP }   from 'meteor/http';
import { check }  from 'meteor/check';

import { Tiles } from '../lib/collections';

import { months } from '../imports/months';
import { config } from '../imports/tile-config';

_ = lodash;

const TRUNCATE_LENGTH = 200;

Meteor.methods( {

  poll ( interval, endpoint, query, map, property, Collection = Tiles ) {
    const curEntries = Collection.find( ).fetch( );
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
    const updatedEntries = Collection.find( ).fetch( );
    const difference     = updatedEntries.length - curEntries.length;
    console.log(
      `\n\nNew  collection size:
       ${ updatedEntries.length } tiles ( ${ difference } new, ${ retrievedCount - difference } updated )\n`
    );
  },


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
        month: startDate.getMonth()
      };

      dateStr += `${ months[ startObj.month ] } ${ startObj.date }`;
    }

    if ( end ) {
      const endDate = new Date( end );
      endObj = {
        date  : endDate.getDate(),
        month : endDate.getMonth()
      };
    }

    if ( endObj.month > startObj.month || endObj.date > startObj.date ) {

      dateStr += ' - ';

      if ( endObj.month > startObj.month ) {
        dateStr += `${ months[ endObj.month ] } `;
      }

      dateStr += endObj.date;
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
        'omission': '... <br><br><span class = "text-right"><strong>READ MORE</strong></span>'//' […]<br><span class = "position bottom right btn btn-text">Read More</span>'
      }
    ) }</p>`;
  },


  getMedia ( mediaObj = {} ) {
    check( mediaObj, Object );

    let media = [];

    Object.keys( mediaObj ).forEach(
      key => typeof mediaObj[ key ] === 'string' ? media.push( { url : mediaObj[ key ] } ) : media.push( mediaObj[ key ] )
    );

    return media;
  },


  mapSocial ( tile = {} ) {
    check( tile, Object );

/*    if ( tile.products.length > 0 && tile.products[0].link && tile.products[0].name ) {
       return {
         key:       tile.id,
         timestamp: tile.timestamp * 1000,
         type:      'rei',
         title:     tile.products[0].name,
         link:      tile.products[0].link,
         caption:   tile.caption ? Meteor.call( 'truncateText', tile.caption, TRUNCATE_LENGTH ) : null,
         media:     tile.photo ? [ { url: tile.photo.small_square.url }, { url: tile.photo.medium_square.url }/!*, { url: tile.photo.large_square.url }*!/ ] : null,
       };
    }*/

    if ( tile.caption || tile.user.display_name !== '@rei' ) {
      return {
        key:       tile.id,
        timestamp: tile.timestamp * 1000,
        type:      'social',
        title:     tile.user.display_name,
        link:      tile.products.length > 0 ? tile.products[0].link : tile.url,
        caption:   tile.caption ? Meteor.call( 'truncateText', tile.caption, TRUNCATE_LENGTH ) : null,
        media:     tile.photo ? [ { url: tile.photo.small_square.url }, { url: tile.photo.medium_square.url }/*, { url: tile.photo.large_square.url }*/ ] : null,
      };
    }
    return {
      key:          tile.id,
      timestamp:    tile.timestamp * 1000,
      type:         'photo',
      link:         tile.products.length > 0 ? tile.products[0].link : tile.url,
      media:        tile.photo ? [ { url: tile.photo.small.url }, { url: tile.photo.medium.url }, { url: tile.photo.large.url } /*,{ url: tile.photo.original.url }*/ ] : null
    };
  },


  mapEvent ( tile = {} ) {
    check( tile, Object );

    // get the most optimal image prefer session ten course then default
    let images;
    if ( tile.images.session ) {
      images = tile.images.session;
    }
    else if ( tile.images.course ) {
      images = tile.images.course;
    }
    else {
      images = tile.images.default;
    }

    return {
      key:          tile.sessionId,
      timestamp:    Date.parse( tile.start ),
      type:         tile.activityType === 'Random' ? 'event' : 'activity',
      activityType: tile.activityType,
      title:        tile.title,
      link:         `https://rei.com${ tile.uri }`,
      caption:      tile.summary ? Meteor.call( 'truncateText', tile.summary, TRUNCATE_LENGTH ) : null,
      badge:        tile.registration.status === 'WAIT_LIST' ? 'Full – get notified' : null,
      label:        Meteor.call( 'getDateStr', Date.parse( tile.start ), Date.parse( tile.end ) ),

      // Replace when images added to service
      media:        Meteor.call( 'getMedia', images )
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


  getData ( endpoint = '', query = {}, property = '' ) {
    check( endpoint, String );
    check( query,    Object );
    check( property, String );

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

      return [];
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


  purgeTiles ( selector = {} ) {
    check( selector, Object );

    return Tiles.remove( selector );
  }
} );
