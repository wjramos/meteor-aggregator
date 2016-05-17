import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Tile component - represents a single todo item
export default class Tile extends Component {
  // deleteThisTile ( ) {
  //   Meteor.call(
  //     'tiles.remove',
  //     this.props.tile._id
  //   );
  // }
  //
  // togglePublished ( ) {
  //   Meteor.call(
  //     'tiles.setToPublished',
  //     this.props.tile._id,
  //     ! this.props.tile.published
  //   );
  // }

  rawTitle( ) { return { __html: this.props.title .replace( /<(?:.|\n)*?>/gm, '' ) }; }

  rawDesc( ) { return { __html: this.props.description .replace( /<(?:.|\n)*?>/gm, '' ) }; }

  render ( ) {
    // const tile = this.props.tile;
    // Give tiles a different className when they are checked off,
    // so that we can style them nicely in CSS
    // const tileClassName = classnames( {
    //   card:      'card',
    //   // published: this.props.tile.published,
    //   // colXs:     `col-xs-${ this.props.tile.cols.xs || 6 }`,
    //   // colSm:     `col-sm-${ this.props.tile.cols.sm || 4 }`,
    //   // colMd:     `col-md-${ this.props.tile.cols.md || 3 }`,
    //   // colLg:     `col-xs-${ this.props.tile.cols.lg || 2 }`
    // } );
    let inner;
    const content = (
      <div className = 'well'>
        {/*<button className = "icon icon-rei-close"
                onClick   = { this.deleteThisTile.bind( this ) }
        ></button>*/}

        {/*{ this.props.showPublishedButton ? (*/}
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
        ) : '' }
        */}
        <h2>{ new Date( this.props.time ).toLocaleDateString() }</h2>
        <h3 dangerouslySetInnerHTML = { this.rawTitle() }></h3>
        <p dangerouslySetInnerHTML = { this.rawDesc() }></p>
      </div>
    );


    if ( this.props.link && this.props.media ) {
      inner = (
        <a href = { this.props.link }
           target = "_blank"
           className = 'card img-frame center fill' >
          <img src = { this.props.media } />
          { content }
        </a>
      )
    }

    if ( this.props.link && !this.props.media ) {
      inner = (
        <a href = { this.props.link }
           target = "_blank"
           className = 'card' >
           { content }
        </a>
      )
    }

    if ( !this.props.link && this.props.media ) {
      inner = (
        <div className = 'card img-frame center fill' >
          <img src = { this.props.media }
               alt = { this.props.alt }/>
          { content }
        </div>
      )
    }

    return (
      <li className = { 'col-xs-6 col-sm-4 col-md-3 grid-item ' + this.props.type }
          data-category = { this.props.type }
          data-time = { this.props.time } >
        { inner }
      </li>
    );
  }
}

Tile.propTypes = {
  // This component gets the tile to display through a React prop.
  // We can use propTypes to indicate it is required
  tile:        PropTypes.object.isRequired,
  type:        PropTypes.string.isRequired,
  time:        PropTypes.number,
  link:        PropTypes.string,
  title:       PropTypes.string,
  media:       PropTypes.string,
  alt:         PropTypes.string,
  description: PropTypes.string,
  // showPublishedButton: React.PropTypes.bool.isRequired,
};
