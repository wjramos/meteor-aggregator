import React, { Component, PropTypes } from 'react';
import { config } from '../../imports/isotope-config';

import Nav from './Nav.jsx';
import Isotope from './Isotope.jsx';
import Tile from './Tile.jsx';

export default class Grid extends Component {
  render ( ) {
    const now = Date.parse( new Date( ) );
    const tiles = this.props.tiles.map(
      tile => {
console.log( tile )
        if ( tile.badge   !== 'CANCELLED' &&
             tile.badge   !== 'CLOSED' &&
             !( tile.type === 'activity' && tile.timestamp < now ) ) {

          return (
            <Tile
              key  = { tile.key }
              tile = { tile }
            />
          );
        }
      }
    );

    return (
      <main className = "container-fluid" id = "main" >
        <Nav tiles = { tiles } />
        <Isotope
          key = 'isotope'
          className = { 'row row-flex tile isotope' }
          elementType = { 'ul' }
          options = { config }
          disableImagesLoaded = { true }
        >
          { tiles }
        </Isotope>
      </main>
    )
  }
}

Grid.propTypes = {
  tiles: PropTypes.array
};
