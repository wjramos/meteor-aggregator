import React, {Component, PropTypes} from 'react';
import LazyLoad   from 'react-lazyload';
import {Meteor} from 'meteor/meteor';
import classNames from 'classnames';

// Tile component - represents a single todo item
export default class Tile extends Component {

  raw ( str ) {
    return { __html: str.replace( /<(?:(?!br|em|i|b|strong)|\n)*?>/gm, '' ) };
  }

  render () {

    let classifiedActivityType = this.props.tile.activityType;
    ( classifiedActivityType ) ? classifiedActivityType.replace( /\s+/g, '-' ).toLowerCase() : '';

    const classes = [
      'item',
      this.props.tile.type,
      classifiedActivityType,
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

    if ( this.props.tile.media[ 0 ] ) {
      image = (
        <LazyLoad offset={ [ 200, 200 ] } resize={ true } height={ 0 } throttle={ 200 } once>
          <img className="fade in"
               src={ this.props.tile.media[ this.props.tile.media.length - 1 ].url }
            // srcset
               alt={ this.props.tile.alt || '' }/>
        </LazyLoad>
      )
    }

    if ( !this.props.tile.link && this.props.tile.media[ 0 ] ) {
      image = (
        <LazyLoad offset={ [ 200, 200 ] } resize={ true } height={ 0 } throttle={ 200 } once>
          <img className="fade in img-responsive"
               src={ this.props.tile.media[ this.props.tile.media.length - 1 ].url }
            // srcset
               alt={ this.props.tile.alt || '' }/>
        </LazyLoad>
      )
    }

    if ( this.props.tile.title ) {
      title = (
        <h3 className="caption-title" dangerouslySetInnerHTML={ this.raw( this.props.tile.title ) }></h3> );
    }

    if ( this.props.tile.label ) {
      label = ( <p className="caption-label">{ this.props.tile.label }</p> );
    }

    if ( this.props.tile.caption ) {
      desc = <div className="caption-description"
                  dangerouslySetInnerHTML={ this.raw( this.props.tile.caption ) }></div>
    }

    if ( title || label || desc ) {
      content = (
        <div>
          { label }
          { title }
          <div className="expandable">
            { desc }
          </div>
        </div>
      );

      sizer = (
        <div className="card-sizer" style={ { 'visibility' : 'hidden' } }>
          { content }
        </div>
      );
    }

    if ( this.props.tile.caption && this.props.tile.media ) {
      caption = (
        <div className="caption">
          { content }
        </div>
      );
    }

    if ( this.props.tile.badge ) {
      badge = (
        <div className="fill-block overlay">
          <h2 className="position center badge">
            { this.props.tile.badge }
          </h2>
          { caption }
        </div>
      );
    }

    if ( this.props.tile.link && this.props.tile.media && !badge ) {
      inner = (
        <a href={ this.props.link }
           target="_blank"
           className="card">
          { sizer }
          <div className="img-frame center fill">
            { image }
          </div>
          { caption }
        </a>
      )
    }

    if ( this.props.tile.link && this.props.tile.media && badge ) {
      inner = (
        <a href={ this.props.tile.link }
           target="_blank"
           className="card">
          { sizer }
          <div className="img-frame center fill">
            { image }
            { badge }
          </div>
        </a>
      )
    }

    if ( !this.props.tile.link && this.props.tile.media ) {
      inner = (
        <div className="card">
          { image }
          { badge }
        </div>
      )
    }

    if ( this.props.tile.link && !this.props.tile.media ) {
      inner = (
        <a href={ this.props.tile.link }
           target="_blank"
           className="card">
          { content }
        </a>
      )
    }
    return (
      <li className={ classNames( classes ) }
          data-category={ this.props.tile.type }
          data-subcategory={ classifiedActivityType }
          data-timestamp={ this.props.tile.timestamp }
          data-rel-timestamp={ this.props.tile.relTimestamp }>
        { inner }
      </li>
    );
  }
}

Tile.propTypes = {
  tile: PropTypes.object,

  // Configuration
  cols: PropTypes.object,
};
