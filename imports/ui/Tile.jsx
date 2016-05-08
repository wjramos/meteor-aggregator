import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Tile component - represents a single todo item
export default class Tile extends Component {
  deleteThisTile ( ) {
    Meteor.call(
      'tiles.remove',
      this.props.tile._id
    );
  }

  togglePublished ( ) {
    Meteor.call(
      'tiles.setToPublished',
      this.props.tile._id,
      ! this.props.tile.published
    );
  }

  render ( ) {
    // Give tiles a different className when they are checked off,
    // so that we can style them nicely in CSS
    const tileClassName = classnames( {
      card:      'card',
      published: this.props.tile.published,
      colXs:     `col-xs-${ this.props.tile.cols.xs || 6 }`,
      colSm:     `col-sm-${ this.props.tile.cols.sm || 4 }`,
      colMd:     `col-md-${ this.props.tile.cols.md || 3 }`,
      colLg:     `col-xs-${ this.props.tile.cols.lg || 2 }`
    } );

    return (
      <li className = { tileClassName }>
          <button className = "icon icon-rei-close"
                  onClick   = { this.deleteThisTile.bind( this ) }
          ></button>

        { this.props.showPublishedButton ? (
          {/*
          <label className = "toggle-published"
                  onClick  = { this.togglePublished.bind( this ) }
            >
            <input
              type    = "checkbox"
              checked = { this.props.tile.published }
              onClick = { this.togglePublished.bind( this ) }
              readOnly
            />
            { this.props.tile.published ? 'Unpublished' : 'Published }
          </label>
          */}
        ) : '' }
      </li>
    );
  }
}

Tile.propTypes = {
  // This component gets the tile to display through a React prop.
  // We can use propTypes to indicate it is required
  tile:                PropTypes.object.isRequired,
  // showPublishedButton: React.PropTypes.bool.isRequired,
};
