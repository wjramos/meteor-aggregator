
// TODO: Make authorable by admin
export const CURALATE = 'https://api.curalate.com/v1/reels/unitedoutside';
export const CURALATE_QUERY = {
  limit: 10000
};

/* API Documentation: https://wordpress.org/plugins/json-api/other_notes/ */
export const WP       = 'http://brightestyoungthings.com/api/get_recent_posts';
export const WP_QUERY = {
  count:     10000,
  tag:       'rei',
  include:   [ 'date', 'url', 'title', 'excerpt', 'attachments' ],
  order_by:  'date',//'modified'
  order:     'desc',
  read_more: '...',
  // date_format: '',
};

export const EVENTS = 'https://future.rei.com/rest/events/nearby';
export const EVENTS_QUERY = {
  limit:         10000,
  sortBy:        'date',
  sortDirection: 'desc',
  offset:        0,
  distance:      100,
  location:      20500,
  sa:            'United DC',
  // ca:            'Women Only'
};

export const PROGRAMS = {
    'Climbing':            21,
    'Cycling':             22,
    'Outdoor Fitness':     83,
    'Hiking & Camping':    25,
    'Paddling' :           24,
    'Outdoor Photography': 41
};
