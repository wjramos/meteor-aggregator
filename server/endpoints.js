
// TODO: Make authorable by admin
export const CURALATE = 'https://api.curalate.com/v1/reels/optoutside';
export const CURALATE_QUERY = {
  limit: 100,
};

export const WP       = 'http://brightestyoungthings.com/api/get_recent_posts';
export const WP_QUERY = {
  limit: 100,
  // search: 'REI'
};

export const EVENTS   = 'https://feventreg.rei-cloud.com/rs/events/nearby';//'https://rei.com/rest/events/nearby';
export const EVENTS_QUERY = {
  limit:         100,
  sortBy:        'date',
  sortDirection: 'asc',
  offset:        0,
  distance:      50,
  location:      20500,
  sa:            'United DC',
  // ca:            'Women Only'
};
