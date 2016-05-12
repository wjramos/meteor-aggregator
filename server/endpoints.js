export const WP       = 'http://brightestyoungthings.com/api/get_search_results/?search=REI';
export const EVENTS   = 'https://rei.com/rest/events/nearby';
export const CURALATE = 'https://api.curalate.com/v1/reels/optoutside';
export const CURALATE_QUERY = {};
export const WP_QUERY = {};
export const EVENTS_QUERY = {
  params: {
      sortBy:        'date',
      sortDirection: 'asc',
      offset:        0,
      limit:         20,
      distance:      50,
      location:      20500,
      // sa:            'Adventure',
      // ca:            'Women Only'
  }
}
