import React, { Component, PropTypes } from 'react';
import LazyLoad   from 'react-lazyload';
import classNames from 'classnames';

function rawHTML ( str ) {
  return { __html: str.replace( /<(?:(?!br|em|i|b|strong)|\n)*?>/gm, '' ) };
}

export default Tile = ( { tile } ) => {
  if ( !tile.visible ) {
    return null;
  }

  const classes = [
    'item',
    tile.type,
    tile.activitytype,
    `col-xs-${ /*tile.config.cols.xs ||*/ 6 }`,
    `col-sm-${ /*tile.config.cols.sm ||*/ 4 }`,
    `col-md-${ /*tile.config.cols.md ||*/ 3 }`,
    `col-lg-${ /*tile.config.cols.lg ||*/ 3 }`
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

  if ( tile.media.length > 0 ) {
    image = (
      <img className = { `fade in${ !tile.link ? ' img-responsive' : '' }` }
           src = { tile.media[ tile.media.length - 1 ].url }
           // TODO: srcset
           alt = { tile.alt || '' } />
    );
  }

  if ( tile.label ) {
    label = ( <p className = "caption-label">{ tile.label }</p> );
  }

  if ( tile.title ) {
    title = ( <h3 className = "caption-title" dangerouslySetInnerHTML = { rawHTML( tile.title ) }></h3> );
  }

  if ( tile.caption ) {
    desc = ( <div className = "caption-description" dangerouslySetInnerHTML = { rawHTML( tile.caption ) }></div> );
  }

  if ( label || title || desc ) {
    content = (
      <div>
        { label }
        { title }
        <div className = "caption-description expandable">
          { desc }
        </div>
      </div>
    );

    sizer = ( <div className = "card-sizer" style = { { 'visibility' : 'hidden' } }>{ content }</div> );
  }

  if ( tile.caption && tile.media ) {
    caption = (
      <div className = "caption">
        { content }
      </div>
    );
  }

  if ( tile.badge ) {
    badge = (
      <div className = "fill-block overlay">
        <h2 className = "position center badge">
          { tile.badge }
        </h2>
        { caption }
      </div>
    );
  }

  if ( tile.link && tile.media ) {
    inner = (
      <a href = { tile.link }
         target = "_blank"
         className = "card" >
        { sizer }
        <div className = "img-frame center fill">
          <LazyLoad offset = { [ 200, 200 ] } resize = { true } height = { 0 } throttle = { 200 } once >
            { image }
          </LazyLoad>
          { tile.badge ? badge : null }
        </div>
        { !tile.badge ? caption : null }
      </a>
    );
  }

  if ( caption && !tile.link && tile.media ) {
    inner = (
      <div className = "card">
        { sizer }
        <div className = "img-frame center fill">
          <LazyLoad offset = { [ 200, 200 ] } resize = { true } height = { 0 } throttle = { 200 } once >
            { image }
          </LazyLoad>
          { tile.badge ? badge : null }
        </div>
        { !tile.badge ? caption : null }
      </div>
    );
  }

  if ( !caption && tile.link && tile.media ) {
    inner = (
      <a href = { tile.link }
         target = "_blank"
         className = "card">
        { image }
        { badge }
      </a>
    );
  }

  if ( !caption && !tile.link && tile.media ) {
    inner = (
      <div className = "card">
        { image }
        { badge }
      </div>
    );
  }

  if ( tile.link && !tile.media ) {
    inner = (
      <a href = { tile.link }
         target = "_blank"
         className = "card" >
        { content }
      </a>
    );
  }

  return (
    <li className = { classNames( classes ) }
        data-visible       = { tile.visible }
        data-category      = { tile.type }
        data-subcategory   = { tile.activityType }
        data-timestamp     = { tile.timestamp }
        data-rel-timestamp = { tile.relTimestamp } >
      { inner }
    </li>
  );
}
