// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

// import { createContainer } from 'meteor/react-meteor-data';

import Tile from './Tile.jsx';

export default class Grid extends Component {

  renderTiles ( ) {
    const tiles = this.props.tiles;

    return tiles.map(
    tile => (
        <Tile
          type = { tile.type }
          key = { tile.key }
          timestamp = { tile.timestamp }
          title = { tile.title }
          link = { tile.link }
          caption = { tile.caption }
          media = { tile.media }
          badge = { tile.badge }
          label = { tile.label }
        />
      )
    );
  }

  render ( ) {
    return (
      <div className = 'row row-flex tile js-isotope'>
        { this.renderTiles() }
      </div>
    )
  }
}


Grid.propTypes = {
  tiles: PropTypes.array,
  // currentUser: PropTypes.object,
};
