import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const TileSchema = new SimpleSchema( {
  key: {
    type:     Number,
    label:    'ID',
    unique:   true,
    optional: false
  },
  timestamp: {
    type:     Number,
    label:    'Timestamp',
    optional: false
  },
  relTimestamp: {
    type:     Number,
    label:    'Relative Timestamp',
    optional: false
  },
  type: {
    type:     String,
    label:    'Type',
    optional: true
  },
  activitytype: {
    type:     String,
    label:    'activitytype',
    optional: true
  },
  title: {
    type:     String,
    label:    'Title',
    optional: true
  },
  label: {
    type:     String,
    label:    'Label',
    optional: true
  },
  badge: {
    type:     String,
    label:    'Badge',
    optional: true
  },
  link: {
    type:     String,
    label:    'Link',
    regEx:    SimpleSchema.RegEx.Url,
    optional: true
  },
  media: {
    type:     [ Object ],
    label:    'Media',
    optional: true
  },
  'media.$.url': {
    type:     String,
    label:    'Media URL',
    regEx:    /^(https?:)?\/?\//,
    optional: false
  },
  caption: {
    type:     String,
    label:    'Caption',
    optional: true
  },
  config: {
    type:     Object,
    label:    'Tile Configuration',
    optional: true
  },
  'config.$.published': {
    type:     Boolean,
    label:    'Tile Published',
    optional: true
  },
  'config.$.ratio': {
    type:     String,
    label:    'Tile Ratio',
    optional: true
  },
  'config.$.cols': {
    type:     Object,
    label:    'Tile Size per Breakpoint',
    optional: true
  },
  'config.$.cols.$.xs': {
    type:     Number,
    label:    'Tile size ( xs )',
    optional: true
  },
  'config.$.cols.$.sm': {
    type:     Number,
    label:    'Tile size ( sm )',
    optional: true
  },
  'config.$.cols.$.md': {
    type:     Number,
    label:    'Tile size ( md )',
    optional: true
  },
  'config.$.cols.$.lg': {
    type:     Number,
    label:    'Tile size ( lg )',
    optional: true
  }
} );
