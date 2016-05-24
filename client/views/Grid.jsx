import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';

import Tile from './Tile.jsx';

import { config } from '../../imports/masonry-config';

export default class Grid extends Component {

  renderTiles ( ) {
    const tiles = this.props.tiles;

    return tiles.map(
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
            />
          );
        }
      }
    );
  }

  render ( ) {
    let masonry;

    return (
      <Masonry className   = { 'row row-flex tile' }
               elementType = { 'ul' }
               //options     = { config }
               //disableImagesLoaded = { false }
              >
        { this.renderTiles( ) }
      </Masonry>
    )
  }
}


Grid.propTypes = {
  tiles: PropTypes.array,
  // currentUser: PropTypes.object,
};
