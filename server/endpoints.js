
// TODO: Make authorable by admin
export const CURALATE = 'https://api.curalate.com/v1/reels/unitedoutside';
export const CURALATE_QUERY = {
  limit: 100,
};

export const WP       = 'http://brightestyoungthings.com/api/get_recent_posts';
export const WP_QUERY = {
  limit: 100,
  // search: 'REI'
};

export const EVENTS = 'https://future.rei.com/rest/events/nearby';
export const EVENTS_QUERY = {
  limit:         100,
  sortBy:        'date',
  sortDirection: 'asc',
  offset:        0,
  distance:      100,
  location:      20500,
  sa:            'United DC'
  // ca:            'Women Only'
};

export const PROGRAMS = { 
    cycling : 22,
    'Outdoor Fitness' : 83,
    'Hiking & Camping' : 25,
    'Paddling' : 24,
    'Outdoor Photography' : 41
};