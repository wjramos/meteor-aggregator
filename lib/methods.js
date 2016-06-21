import { Meteor } from 'meteor/meteor';
import { HTTP }   from 'meteor/http';
import { check }  from 'meteor/check';

import { Tiles } from '../lib/collections';

import { months } from '../imports/months';
import { config } from '../imports/tile-config';

_ = lodash;

const TRUNCATE_LENGTH = 200;
const TIME_OFFSET = 1000 * 60 * 60 * 24;

function getEventImages( images ) {
  if ( images.session ) {
    return images.session;
  } else if ( images.course ) {
    return images.course;
  } else {
    return images.default;
  }
}


function getTimeDiff( timestamp = 0, reference = Date.parse( new Date( ) ) ) {
  check( timestamp, Number );
  check( reference, Number );

  return Math.abs( timestamp - reference );
}


function makeDateStr( start = 0, end = 0 ) {
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

    dateStr += `${ months[ startObj.month ] }\xa0${ startObj.date }`;
  }

  if ( end ) {
    const endDate = new Date( end );

    endObj = {
      date:  endDate.getDate(),
      month: endDate.getMonth()
    };
  }

  if ( endObj.month > startObj.month || endObj.date > startObj.date ) {

    dateStr += ' - ';

    if ( endObj.month > startObj.month ) {
      dateStr += `${ months[ endObj.month ] }\xa0`;
    }

    dateStr += endObj.date;
  }

  return dateStr;
}


function truncateText( text = '', length = 360 ) {
  check( text,   String );
  check( length, Number );
  return `<p>${ _.truncate( text,
    {
      'length': length,
      'separator': /,? +/,
      'omission': '... <br><br><span class = "text-right"><strong>READ MORE</strong></span>'//' […]<br><span class = "position bottom right btn btn-text">Read More</span>'
    }
  ) }</p>`;
}


function getMedia( mediaObj = {} ) {
  check( mediaObj, Object );

  let media = [];

  Object.keys( mediaObj ).forEach(
    key => typeof mediaObj[ key ] === 'string' ? media.push( { url : mediaObj[ key ] } ) : media.push( mediaObj[ key ] )
  );

  return media;
}


Meteor.methods( {

  mapSocial ( tile = {} ) {
    check( tile, Object );

    const timestamp = tile.timestamp * 1000;

    if ( tile.caption ) {
      return {
        key:       tile.id,
        timestamp: timestamp - TIME_OFFSET,
        type:      'social',
        title:     tile.user.username || tile.user.display_name,
        link:      tile.products.length > 0 ? tile.products[0].link : tile.url,
        caption:   tile.caption ? truncateText( tile.caption, TRUNCATE_LENGTH ) : null,
        media:     tile.photo ? [ { url: tile.photo.small_square.url }, { url: tile.photo.medium_square.url }/*, { url: tile.photo.large_square.url }*/ ] : null
      };
    }

    return {
      key:          tile.id,
      timestamp:    timestamp,
      type:         'photo',
      link:         tile.products.length > 0 ? tile.products[0].link : tile.url,
      media:        tile.photo ? [ { url: tile.photo.small.url }, { url: tile.photo.medium.url }, { url: tile.photo.large.url } /*,{ url: tile.photo.original.url }*/ ] : null
    };
  },


  mapEvent ( tile = {} ) {
    check( tile, Object );

    const timestamp = Date.parse( tile.start );
    const end = Date.parse( tile.end );

    return {
      key:          tile.sessionId,
      timestamp:    timestamp,
      type:         tile.activityType === 'Random' ? 'event' : 'activity',
      activityType: tile.activityType,
      title:        tile.title,
      link:         `https://rei.com${ tile.uri }`,
      caption:      tile.summary ? truncateText( tile.summary, TRUNCATE_LENGTH ) : null,
      badge:        tile.registration.status === 'WAIT_LIST' ? 'Full – get notified' : null,
      label:        makeDateStr( timestamp, end ),
      media:        getMedia( getEventImages( tile.images ) )
    };
  },


  mapPost ( tile = {} ) {
    check( tile, Object );

    const timestamp = Date.parse( tile.date );

    return {
      key:          tile.id,
      timestamp:    timestamp,
      type:         'blog',
      title:        tile.title,
      label:        'blog',
      link:         tile.url,
      caption:      tile.excerpt ? truncateText( tile.excerpt, TRUNCATE_LENGTH ) : '',
      media:        tile.attachments[0] ? getMedia( tile.attachments[0].images ) : []
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
      const now = Date.parse( new Date( ) );

      console.log( `Found ${ items.length } items – Mapping and inserting using ${ map } schema adaptor...` );

      return items.forEach(
        tile => {
          const mapped = Meteor.call( map, tile );
          mapped.relTimestamp = getTimeDiff( mapped.timestamp, now );

          Tiles.update(
            { _id:    mapped.key },
            { $set:   mapped },
            { upsert: true }
          );
        }
      );
    }
  },


  purgeCollection ( Collection = Tiles, selector = {} ) {
    check( Collection, Match.Any );
    check( selector,   Object );

    return Collection.remove( selector );
  }
} );
