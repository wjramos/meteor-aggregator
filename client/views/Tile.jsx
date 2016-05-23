import React, { Component, PropTypes } from 'react';
import LazyLoad   from 'react-lazyload';
import { Meteor } from 'meteor/meteor';
// import classnames from 'classnames';

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

  raw( str ) { return { __html: str.replace( /<(?:(?!br|em|i|b|strong)|\n)*?>/gm, '' ) }; }

  render ( ) {
    let image;
    let label;
    let title;
    let desc;
    let caption;
    let badge;
    let content;
    let inner;

    if ( this.props.media[0] ) {
      image = (
        <LazyLoad offset = { 200 } height = { 0 }>
          <img src = { this.props.media[ this.props.media.length - 1 ].url }
               // srcset
               alt = { this.props.alt } />
        </LazyLoad>
      )
    }

    if ( this.props.title ) {
      title = ( <h3 dangerouslySetInnerHTML = { this.raw( this.props.title ) }></h3> );
    }

    if ( this.props.label ) {
      label = ( <p className = 'label-classification'>{ this.props.label }</p> );
    }

    if ( this.props.caption ) {
      desc = <p dangerouslySetInnerHTML = { this.raw( this.props.caption ) }></p>
    }

    if ( title || label || desc ) {
      content = (
        <div className = 'well well-lg position left'>
          {/*<button className = 'icon icon-rei-close'
                  onClick   = { this.deleteThisTile.bind( this ) }
          ></button>*/}

          {/*{ this.props.showPublishedButton ? (*/}
            {/*
            <label className = 'toggle-published'
                    onClick  = { this.togglePublished.bind( this ) }
              >
              <input
                type    = 'checkbox'
                checked = { this.props.tile.published }
                onClick = { this.togglePublished.bind( this ) }
                readOnly
              />
              { this.props.tile.published ? 'Unpublished' : 'Published }
            </label>
          ) : '' }
          */}
          { label }
          { title }
          { desc }
        </div>
      );
    }

    if ( this.props.caption && this.props.media ) {
      caption = (
        <div className = 'caption'>
          { content }
        </div>
      );
    }

    if ( this.props.badge ) {
      badge = (
        <span className = 'position top right'>
          { this.props.badge }
        </span>
      );
    }

    if ( this.props.link && this.props.media ) {
      inner = (
        <a href = { this.props.link }
           target = '_blank'
           className = 'card' >
          <div className = 'img-frame center fill'>
            { image }
            <div style = { { 'visibility' : 'hidden' } }>
              { content }
            </div>
            { caption }
            { badge }
          </div>
        </a>
      )
    }

    if ( this.props.link && !this.props.media ) {
      inner = (
        <a href = { this.props.link }
           target = '_blank'
           className = 'card' >
           { content }
           { caption }
        </a>
      )
    }

    if ( !this.props.link && this.props.media ) {
      inner = (
        <div className = 'card'>
          <div className = 'img-frame center fill' >
            { image }
            <div style = { { 'visibility' : 'hidden' } }>
              { content }
            </div>
            { content }
            { caption }
          </div>
        </div>
      )
    }

    return (
        <li className = { 'col-xs-6 col-sm-4 col-md-3 item ' + this.props.type }
            data-category  = { this.props.type }
            data-timestamp = { this.props.timestamp }
            data-rel-timestamp = { this.props.relTimestamp } >
          { inner }
        </li>
    );
  }
}

Tile.propTypes = {
  masonry:      PropTypes.object,
  media:        PropTypes.array.isRequired,
  timestamp:    PropTypes.number.isRequired,
  relTimestamp: PropTypes.number,
  type:         PropTypes.string.isRequired,
  label:        PropTypes.string,
  link:         PropTypes.string,
  title:        PropTypes.string,
  alt:          PropTypes.string,
  badge:        PropTypes.string,
  caption:      PropTypes.string,
  // showPublishedButton: React.PropTypes.bool.isRequired,
};
