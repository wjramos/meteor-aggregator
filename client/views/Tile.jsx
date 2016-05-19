import React, { Component, PropTypes } from 'react';
import LazyLoad   from 'react-lazyload';
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

  raw( str ) { return { __html: str.replace( /<(?:(?!br|em|i|b|strong)|\n)*?>/gm, '' ) }; }

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
    let label;
    let title;
    let desc;
    let caption;
    let badge;
    let content;
    let inner;

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
        <div className = 'well well-lg'>
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
            <LazyLoad offset = { 100 }>
              <img src = { this.props.media }
                   alt = { this.props.alt } />
            </LazyLoad>
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
            <LazyLoad offset = { 100 }>
              <img src = { this.props.media }
                   alt = { this.props.alt } />
            </LazyLoad>
            { content }
            { caption }
          </div>
        </div>
      )
    }

    return (
        <li className = { 'col-xs-6 col-sm-4 col-md-3 item ' + this.props.type }
            data-category  = { this.props.type }
            data-timestamp = { this.props.timestamp } >
          { inner }
        </li>
    );
  }
}

Tile.propTypes = {
  tile:        PropTypes.object.isRequired,
  type:        PropTypes.string.isRequired,
  timestamp:   PropTypes.number,
  label:       PropTypes.string,
  link:        PropTypes.string,
  title:       PropTypes.string,
  media:       PropTypes.string,
  alt:         PropTypes.string,
  badge:       PropTypes.string,
  caption:     PropTypes.string,
  // showPublishedButton: React.PropTypes.bool.isRequired,
};
