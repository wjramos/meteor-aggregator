import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const Schemas = {
  Tile : new SimpleSchema( {
    type:       {
      type:     String,
      label:    'Type',
      max:      200
    },

    time:       {
      type:     Object,
      label:    'Date item was published start - end',
    }, // Range?

    title:      {
      type:     String,
      label:    'Title',
      optional: true,
      max:      200
    },

    desc:       {
      type:     String,
      label:    'Description',
      optional: true,
      max:      1000
    },

    link:       {
      type:     String,
      label:    'Link',
      optional: true,
      max:      200
    },

    alt:        {
      type:     String,
      label:    'Image Alt Text',
      optional: true,
      max:      200
    },

    media:      { // Initial use only a single piece of media -- down the road change to support srcset
      type:     Object,
      label:    'Collection of media',
      optional: true
    }
  } )
};
