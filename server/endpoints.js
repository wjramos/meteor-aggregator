
// TODO: Make authorable by admin
export const CURALATE = 'https://api.curalate.com/v1/reels/unitedoutside';
export const CURALATE_QUERY = {
  limit: 10000
};

export const WP       = 'http://brightestyoungthings.com/api/get_recent_posts';
export const WP_QUERY = {
  limit: 10000,
  // tag:   'rei'
};

export const EVENTS = 'https://rei.com/rest/events/nearby';
export const EVENTS_QUERY = {
  limit:         10000,
  sortBy:        'date',
  sortDirection: 'asc',
  offset:        0,
  distance:      100,
  location:      20500,
  // sa:            'United DC',
  // ca:            'Women Only'
};

export const PROGRAMS = {
    climbing:          21,
    cycling:           22,
    'Outdoor Fitness': 83
};
