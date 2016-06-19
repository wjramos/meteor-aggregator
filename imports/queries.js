import Query from './Query';

const PROGRAMS = {
    'Climbing':                  21,
    'Cycling':                   22,
    'Navigation':                23,
    'Paddling' :                 24,
    'Hiking & Camping':          25,
    'Snowsports':                26,
    'Outdoor Photography':       41,
    'Volunteering':              81,
    'Travel':                    82,
    'Outdoor Fitness':           83,
    'Stewardship':               84,
    'Member Benefits':           85,
    'Wilderness Medicine':       102,
    'Random':/*'Store Event'*/   122,
    'Post Course Registrations': 123
};

const eventQuery = {
  endpoint:  'https://rei.com/rest/events/nearby',
  mapMethod: 'mapEvent',
  property:  'events',
  query: {
    limit:         10000,
    sortBy:        'date',
    sortDirection: 'desc',
    offset:        0,
    distance:      30,
    location:      20500,
    programIds:    null,
    sa:            'United DC'
  }
};

const curalateQuery = {
  endpoint:  'https://api.curalate.com/v1/reels/unitedoutside',
  mapMethod: 'mapSocial',
  property:  'items',
  query:     { limit: 10000 }
};

/* API Documentation: https://wordpress.org/plugins/json-api/other_notes/ */
const wpQuery = {
  endpoint:  'http://www.brightestyoungthings.com/?json=get_tag_posts',
  mapMethod: 'mapPost',
  property:  'posts',
  query:     {
    count:     10000,
    tag_slug:  'rei',
    order_by:  'date',
    order:     'desc',
    read_more: '...',
    include:   [
      'date',
      'url',
      'title',
      'excerpt',
      'attachments'
    ]
  }
};


let queries = [ curalateQuery, wpQuery ].map( query => new Query( query ) );

for ( program in PROGRAMS ) {
  if ( PROGRAMS.hasOwnProperty( program ) ) {
    eventQuery.query.programIds = PROGRAMS[ program ];
    const query = new Query( eventQuery );

    // Attach label to results
    query.results.forEach( result => result.activityType = program )

    queries.push( query );
  }
}

export default queries;
