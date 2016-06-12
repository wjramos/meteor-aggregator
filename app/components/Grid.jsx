import React, { Component, PropTypes } from 'react';
import { config } from '../../imports/isotope-config';

import Nav from './Nav.jsx';
import Isotope from './Isotope.jsx';
import Tile from './Tile.jsx';

function getActive( tiles ) {
  const now = Date.parse( new Date( ) );
  return tiles.filter(
    tile => (
      !( tile.type  === 'activity' && tile.timestamp < now ) &&
         tile.badge !== 'CANCELLED' &&
         tile.badge !== 'CLOSED'
    )
  );
}

function getUniqueValues( arr, key ) {
  return arr.reduce( ( carry, item ) => {
    if ( item[ key ] && !~carry.indexOf( item[ key ] ) ) {
      carry.push( item[ key ] );
    }

    return carry;
  }, [] ).sort();
}

export default Grid = ( { tiles } ) => {
  tiles = getActive( tiles );
  return (
    <main className = "container-fluid" id = "main" >
      <Nav categories = { getUniqueValues( tiles, 'type' ) } />
      <Isotope
        key = 'isotope'
        className = { 'row row-flex tile isotope' }
        elementType = { 'ul' }
        options = { config }
        disableImagesLoaded = { true }
      >
        { tiles.map( tile => ( <Tile key = { tile.key } tile = { tile } /> ) ) }
      </Isotope>
    </main>
  );
}
