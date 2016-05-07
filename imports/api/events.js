import { Meteor } from 'meteor/meteor';
import { Mongo }  from 'meteor/mongo';
import { check }  from 'meteor/check';

export const Events = new Mongo.Collection( 'events' );

if ( Meteor.isServer ) {
  // This code only runs on the server
  // Only publish events that are public or belong to the current user
  Meteor.publish(
    'events',
    function eventsPublication( ) {
      return Events.find( {
        $or: [
          {
            hidden: {
              $ne: true
            }
          },
        ],
      } );
    }
  );
}

Meteor.methods( {
  'events.setHidden'( eventId, setToHidden ) {
    check( eventId, String );
    check( setToHidden, Boolean );

    const event = Events.findOne( eventId );

    // Make sure only the event owner can make a event hidden
    if ( event.owner !== this.userId ) {
      throw new Meteor.Error( 'not-authorized' );
    }

    Events.update(
      eventId, {
        $set: {
          hidden: setToHidden
        }
      }
    );
  },
});
