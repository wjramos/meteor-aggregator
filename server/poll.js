import { Meteor } from 'meteor/meteor';
import queries from './endpoints';

const POLL_INTERVAL = 300000; // 5 min

console.log( `\n---------------- POLLING ( ${ ( POLL_INTERVAL / 1000 / 60 ).toFixed( 1 ) } minute interval )----------------\n` );

queries.forEach( query => {
  console.log( query );
  Meteor.call( 'poll', POLL_INTERVAL, query.endpoint, query.query, query.mapMethod, query.property );
} );
