import React, { Component, PropTypes } from 'react';
import Tile from './Tile.jsx';
import IsotopeComponent from './Isotope.jsx';
import { config } from '../../imports/isotope-config';

export default class Grid extends Component {

  renderTiles ( ) {
    return this.props.tiles.map(
      tile => {

        if ( tile.badge !== 'CANCELLED' &&
             tile.badge !== 'CLOSED' ) {

          return (
            <Tile
              type         = { tile.type }
              key          = { tile.key }
              timestamp    = { tile.timestamp }
              relTimestamp = { tile.relTimestamp }
              title        = { tile.title }
              link         = { tile.link }
              caption      = { tile.caption }
              media        = { tile.media }
              badge        = { tile.badge }
              label        = { tile.label }
              cols         = { {
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
      <IsotopeComponent className = { 'row row-flex tile js-masonry' }
               elementType = { 'ul' }
               options = { config }>
        { this.renderTiles( ) }
      </IsotopeComponent>
    )
  }
}


Grid.propTypes = {
  tiles: PropTypes.array
  // currentUser: PropTypes.object,
};
