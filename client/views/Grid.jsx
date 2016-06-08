import React, { Component, PropTypes } from 'react';
import Tile from './Tile.jsx';
import IsotopeComponent from './Isotope.jsx';
import { config } from '../../imports/isotope-config';


export default class Grid extends Component {

  renderTiles ( ) {
    const now = Date.parse( new Date( ) );
    return this.props.tiles.map(
      tile => {

        if ( tile.badge   !== 'CANCELLED' &&
             tile.badge   !== 'CLOSED' &&
             !( tile.type === 'activity' && tile.timestamp < now ) ) {

          return (
            <Tile
              key  = { tile.key }
              tile = { tile }
              cols = { {
                xs: null,
                sm: null,
                md: null,
                lg: 3
              } }
            />
          );
        }
      }
    );
  }

  render ( ) {
    return (
      <IsotopeComponent
        key = 'isotope'
        className = { 'row row-flex tile isotope' }
        elementType = { 'ul' }
        options = { config }
        disableImagesLoaded = { true }
      >
        { this.renderTiles( ) }
      </IsotopeComponent>
    )
  }
}


Grid.propTypes = {
  tiles: PropTypes.array
};
