import { Meteor } from 'meteor/meteor';
import { HTTP }   from 'meteor/http';
import { check }  from 'meteor/check';

import { Tiles } from '../lib/collections';

import { months } from '../imports/months';
import tileDefault from '../imports/tile-config';

_ = lodash;

const TRUNCATE_LENGTH = 200;

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


  mapSocial ( tile = {}, added = 0 ) {
    check( tile,  Object );
    check( added, Number );

    let config     = tileDefault;
    console.log( !!tile.tags );
    // if ( Array.isArray( tile.tags ) ) {
    //   config.visible = !tile.tags.includes( 'hide' );
    // }

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
    const timestamp = tile.timestamp * 1000;

    let mapped = {
      key:          tile.id,
      link:         tile.products.length > 0 ? tile.products[0].link : tile.url,
      relTimestamp: Meteor.call( 'getTimestampDiff', timestamp, added ),
      type:         'photo',
      media:        tile.photo ? [ { url: tile.photo.small.url }, { url: tile.photo.medium.url }, { url: tile.photo.large.url } /*,{ url: tile.photo.original.url }*/ ] : null,
      timestamp,
      config
    }

    if ( tile.caption || tile.user.display_name !== '@rei' ) {
      mapped.type    = 'social',
      mapped.title   = tile.user.username;//display_name
      mapped.caption = tile.caption ? Meteor.call( 'truncateText', tile.caption, TRUNCATE_LENGTH ) : null;
      mapped.media   = tile.photo ? [ { url: tile.photo.small_square.url }, { url: tile.photo.medium_square.url }/*, { url: tile.photo.large_square.url }*/ ] : null;
    }

    return mapped;
  },


  mapEvent ( tile = {}, added = 0 ) {
    check( tile,  Object );
    check( added, Number );

    const timestamp = Date.parse( tile.start );

    let config     = tileDefault;
    config.visible = timestamp >= added && tile.registration.status !== 'CANCELLED' && tile.registration.status !== 'CLOSED';

    // get the most optimal image prefer session ten course then default
    let images;
    if ( tile.images.session ) {
      images = tile.images.session;
    } else if ( tile.images.course ) {
      images = tile.images.course;
    } else {
      images = tile.images.default;
    }

    return {
      key:          tile.sessionId,
      type:         tile.activityType === 'Random' ? 'event' : 'activity',
      activityType: tile.activityType,
      title:        tile.title,
      link:         `https://rei.com${ tile.uri }`,
      caption:      tile.summary ? Meteor.call( 'truncateText', tile.summary, TRUNCATE_LENGTH ) : null,
      badge:        tile.registration.status === 'WAIT_LIST' ? 'Full – get notified' : null,
      label:        Meteor.call( 'getDateStr', Date.parse( tile.start ), Date.parse( tile.end ) ),
      media:        Meteor.call( 'getMedia', images ),
      relTimestamp: Meteor.call( 'getTimestampDiff', timestamp, added ),
      timestamp,
      config
    };
  },


  mapPost ( tile = {}, added = 0 ) {
    check( tile,  Object );
    check( added, Number );

    let config      = tileDefault;
    const timestamp = Date.parse( tile.date );

    return {
      key:          tile.id,
      type:         'blog',
      title:        tile.title,
      label:        'blog',
      link:         tile.url,
      caption:      tile.excerpt ? Meteor.call( 'truncateText', tile.excerpt, TRUNCATE_LENGTH ) : '',
      media:        tile.attachments[0] ? Meteor.call( 'getMedia', tile.attachments[0].images ) : [],
      relTimestamp: Meteor.call( 'getTimestampDiff', timestamp, added ),
      timestamp,
      config
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
      const added = Date.parse( new Date( ) );

      return items.forEach(
        tile => {
          const mapped = Meteor.call( map, tile, added );

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
