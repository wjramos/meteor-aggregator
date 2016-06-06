import React, { Component, PropTypes } from 'react';
import LazyLoad   from 'react-lazyload';
import { Meteor } from 'meteor/meteor';
import classNames from 'classnames';

// Tile component - represents a single todo item
export default class Tile extends Component {

  raw( str ) { return { __html: str.replace( /<(?:(?!br|em|i|b|strong)|\n)*?>/gm, '' ) }; }

  render ( ) {
    const classes = [
      'item',
      this.props.type,
      `col-xs-${ this.props.cols.xs || 6 }`,
      `col-sm-${ this.props.cols.sm || 4 }`,
      `col-md-${ this.props.cols.md || 3 }`,
      `col-lg-${ this.props.cols.lg || 3 }`
    ];

    let image;
    let label;
    let title;
    let desc;
    let caption;
    let badge;
    let content;
    let inner;
    let sizer;

    if ( this.props.media[0] ) {
      image = (
        <LazyLoad offset = { [ 200, 200 ] } resize = { true } height = { 0 } throttle = { 200 } once >
          <img className = "fade in"
               src = { this.props.media[ this.props.media.length - 1 ].url }
               // srcset
               alt = { this.props.alt || '' } />
        </LazyLoad>
      )
    }

    if ( !this.props.link && this.props.media[0] ) {
      image = (
        <LazyLoad offset = { [ 200, 200 ] } resize = { true } height = { 0 } throttle = { 200 } once >
          <img className = "fade in img-responsive"
               src = { this.props.media[ this.props.media.length - 1 ].url }
               // srcset
               alt = { this.props.alt || '' } />
        </LazyLoad>
      )
    }

    if ( this.props.title ) {
      title = ( <h3 className = "caption-title" dangerouslySetInnerHTML = { this.raw( this.props.title ) }></h3> );
    }

    if ( this.props.label ) {
      label = ( <p className = "caption-label">{ this.props.label }</p> );
    }

    if ( this.props.caption ) {
      desc = <div className = "caption-description" dangerouslySetInnerHTML = { this.raw( this.props.caption ) }></div>
    }

    if ( title || label || desc ) {
      content = (
        <div>
          { label }
          { title }
          <div className = "expandable">
            { desc }
          </div>
        </div>
      );

      sizer = (
        <div className = "card-sizer" style = { { 'visibility' : 'hidden' } }>
          { content }
        </div>
      );
    }

    if ( this.props.caption && this.props.media ) {
      caption = (
        <div className = "caption">
          { content }
        </div>
      );
    }

    if ( this.props.badge ) {
      badge = (
        <div className = "fill-block overlay">
          <h2 className = "position center text-uppercase">
            { this.props.badge }
          </h2>
        </div>
      );
    }

    if ( this.props.link && this.props.media ) {
      inner = (
        <a href = { this.props.link }
           target = "_blank"
           className = "card" >
          { sizer }
          <div className = "img-frame center fill">
            { image }
            { badge }
          </div>
          { caption }
        </a>
      )
    }

    if ( !this.props.link && this.props.media ) {
      inner = (
        <div className = "card">
            { image }
            { badge }
        </div>
      )
    }

    if ( this.props.link && !this.props.media ) {
      inner = (
        <a href = { this.props.link }
           target = "_blank"
           className = "card" >
          { content }
        </a>
      )
    }

    return (
        <li className = { classNames( classes ) }
            data-category  = { this.props.type }
            data-timestamp = { this.props.timestamp }
            data-rel-timestamp = { this.props.relTimestamp } >
          { inner }
        </li>
    );
  }
}

Tile.propTypes = {
  // Configured
  cols:         PropTypes.object,

  // Collection
  media:        PropTypes.array.isRequired,
  timestamp:    PropTypes.number.isRequired,
  relTimestamp: PropTypes.number,
  type:         PropTypes.string.isRequired,
  label:        PropTypes.string,
  link:         PropTypes.string,
  title:        PropTypes.string,
  alt:          PropTypes.string,
  badge:        PropTypes.string,
  caption:      PropTypes.string
};
