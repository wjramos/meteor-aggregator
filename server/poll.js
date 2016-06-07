import { Meteor } from 'meteor/meteor';
import queries from './queries';

const POLL_INTERVAL = 300000; // 5 min

queries.forEach( query => query.poll( POLL_INTERVAL ) );
console.log( `\n---------------- POLLING ( ${ ( POLL_INTERVAL / 1000 / 60 ).toFixed( 1 ) } minute interval )----------------\n` );
