
// TODO: Make authorable by admin
export const CURALATE = 'https://api.curalate.com/v1/reels/optoutside';
export const CURALATE_QUERY = {
  limit: 10000
};

/* API Documentation: https://wordpress.org/plugins/json-api/other_notes/ */
export const WP       = 'http://brightestyoungthings.com/?json=get_tag_posts';
export const WP_QUERY = {
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
};

export const EVENTS       = 'https://rei.com/rest/events/nearby';
export const EVENTS_QUERY = {
  limit:         10000,
  sortBy:        'date',
  sortDirection: 'desc',
  offset:        0,
  distance:      100,
  location:      20500,
  sa:            'United DC'
};

/* Ideally this would be brought along from a single query */
export const PROGRAMS = {
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
