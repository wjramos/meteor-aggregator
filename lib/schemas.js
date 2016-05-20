import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const TileSchema = new SimpleSchema( {
  key: {
    type:   Number,
    label:  'ID',
    unique: true
  },
  timestamp: {
    type:  Number,
    label: 'Timestamp'
  },
  type: {
    type:     String,
    label:    'Type',
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
  "media.$.url": {
    type:  String,
    label: "Media URL",
    regEx: SimpleSchema.RegEx.Url,
  },
  caption: {
    type:     String,
    label:    'Caption',
    optional: true
  }
} );
