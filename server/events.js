import { Meteor } from 'meteor/meteor';
// import { Mongo }  from 'meteor/mongo';
//
import { events as ENDPOINT } from './endpoints';
//
// export const Events = new Mongo.Collection( 'events' );
//
// Meteor.http.get(
//     endpoints.events,
//     ( err, result ) => Events.insert( result )
// );
const POLL_INTERVAL = 5000;
const COLLECTION    = 'Events';
const OPTIONS       = {
    sortBy:        'date',
    sortDirection: 'asc',
    offset:        0,
    limit:         20,
    distance:      50,
    location:      20500,
    // sa:            'Adventure',
    // ca:            'Women Only'
};

Meteor.publish(
    'polled-events', () => {
    const publishedKeys = {};

    const poll = () => {
        // Let's assume the data comes back as an array of JSON documents, with an _id field, for simplicity
        const data = HTTP.get( ENDPOINT, OPTIONS );

        data.events.forEach(
            event => {
                if ( publishedKeys[ event.sessionId ] ) {
                    this.changed( COLLECTION, event.sessionId, event );
                } else {
                    publishedKeys[ event.sessionId ] = true;

                    if ( publishedKeys[ event.sessionId ] ) {
                        this.added( COLLECTION, event.sessionId, event );
                    }
                }
            }
        );
    };

    poll();
    this.ready();

    const interval = Meteor.setInterval( poll, POLL_INTERVAL );

    this.onStop( () => {
        Meteor.clearInterval( interval );
    } );
} );
