import { composeWithTracker } from 'react-komposer';

import { Tiles } from '../../lib/collections';
import Grid from '../components/Grid.jsx';

const loading = ( ) => ( '<div>Loading...</div>' );

const composer = ( props, onData ) => {
  if ( Meteor.subscribe( 'tiles' ).ready( ) ) {
    const tiles = Tiles.find( {}, { sort: { relTimestamp: 1 } } ).fetch();
    onData( null, { tiles } );
  };
};

export default composeWithTracker( composer, loading )( Grid );
