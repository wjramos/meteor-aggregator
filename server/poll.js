import { Meteor } from 'meteor/meteor';
import { Events, Posts, Social } from '../imports/collections';
import { Schemas } from '../imports/schemas';

const POLL_INTERVAL = 300000; // 5 min

function poll ( ) {
    console.log( 'polling' );
    let social = Meteor.call( 'getCuralateData' );
    let events = Meteor.call( 'getEventData' );
    let posts  = Meteor.call( 'getWpData' )

    Social.insert( social );
    Events.insert( events );
    Posts.insert( posts );
}

poll( );

Meteor.setInterval( poll, POLL_INTERVAL );
