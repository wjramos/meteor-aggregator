import endpoints from './endpoints';

let collection = new Mongo.Collection( 'events' );

Meteor.http.call(
    'GET', 
    endpoints.events,
    result => collection.insert( result )
);
