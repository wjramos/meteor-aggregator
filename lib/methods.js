import { Meteor } from 'meteor/meteor';
import { HTTP }   from 'meteor/http';
import { check }  from 'meteor/check';

import { Tiles } from '../lib/collections';

import { months } from '../imports/months';
import tileDefault from '../imports/tile-config';

_ = lodash;

const TRUNCATE_LENGTH = 200;
const TIME_OFFSET = 1000 * 60 * 60 * 24 * 3;

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

  mapSocial ( tile = {}, added = 0 ) {
    check( tile,  Object );
    check( added, Number );

    // const config    = tileDefault;
    const timestamp = tile.timestamp * 1000;

    let mapped = {
      key:          tile.id,
      link:         tile.product ? tile.product.link : tile.url,
      type:         'photo',
      media:        tile.photo ? [ { url: tile.photo.small.url }, { url: tile.photo.medium.url }, { url: tile.photo.large.url } /*,{ url: tile.photo.original.url }*/ ] : null,
      visible:      tile.tags.indexOf( 'hide' ) < 0,
      timestamp
    }

    if ( tile.caption ) {
      mapped.type      = 'social',
      mapped.timestamp = timestamp - TIME_OFFSET;
      mapped.title     = tile.user.username || tile.user.display_name;
      mapped.caption   = tile.caption ? truncateText( tile.caption, TRUNCATE_LENGTH ) : null,
      mapped.media     = tile.photo ? [ { url: tile.photo.small_square.url }, { url: tile.photo.medium_square.url }/*, { url: tile.photo.large_square.url }*/ ] : null;
    }

    mapped.relTimestamp = getTimeDiff( timestamp, added );

    return mapped;
  },


  mapEvent ( tile = {}, added = 0 ) {
    check( tile,  Object );
    check( added, Number );

    // const config       = tileDefault;
    const timestamp    = Date.parse( tile.start );
    const end          = Date.parse( tile.end );
    const relTimestamp = getTimeDiff( timestamp, added );
console.log( tile )
    return {
      key:          tile.sessionId,
      type:         tile.activityType === 'Random' ? 'event' : 'activity',
      activityType: tile.activityType,
      title:        tile.title,
      link:         `https://rei.com${ tile.uri }`,
      caption:      tile.summary ? truncateText( tile.summary, TRUNCATE_LENGTH ) : null,
      badge:        tile.registration.status === 'WAIT_LIST' ? 'Full – get notified' : null,
      label:        makeDateStr( timestamp, end ),
      media:        getMedia( getEventImages( tile.images ) ),
      visible:      relTimestamp > 0 && tile.registration.status !== 'CANCELLED' && tile.registration.status !== 'CLOSED',
      relTimestamp,
      timestamp
    };
  },


  mapPost ( tile = {}, added = 0 ) {
    check( tile,  Object );
    check( added, Number );

    // const config       = tileDefault;
    const timestamp    = Date.parse( tile.date );
    const relTimestamp = getTimeDiff( timestamp, added );

    return {
      key:          tile.id,
      type:         'blog',
      title:        tile.title,
      label:        'blog',
      link:         tile.url,
      caption:      tile.excerpt ? truncateText( tile.excerpt, TRUNCATE_LENGTH ) : '',
      media:        tile.attachments[0] ? getMedia( tile.attachments[0].images ) : [],
      visible:      true,
      relTimestamp,
      timestamp
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
      const added = Date.parse( new Date( ) );

      console.log( `Found ${ items.length } items – Mapping and inserting using ${ map } schema adaptor...` );

      return items.forEach(
        item => {
          item = Meteor.call( map, item, added );

          Tiles.update(
            { _id:    item.key },
            { $set:   item },
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
