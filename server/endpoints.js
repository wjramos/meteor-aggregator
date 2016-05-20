
// TODO: Make authorable by admin
export const CURALATE = 'https://api.curalate.com/v1/reels/optoutside';
export const CURALATE_QUERY = {
  params: {
    limit: 10
  }
};

export const WP       = 'http://brightestyoungthings.com/api/get_search_results';
export const WP_QUERY = {
  params: {
    limit: 10,
    search: 'REI'
  }
};

export const EVENTS   = 'https://rei.com/rest/events/nearby';
export const EVENTS_QUERY = {
  params: {
    limit:         10,
    sortBy:        'date',
    sortDirection: 'asc',
    offset:        0,
    distance:      50,
    location:      20500,
    // sa:            'Adventure',
    // ca:            'Women Only'
  }
};
