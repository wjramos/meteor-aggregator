import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { config } from '../../imports/isotope-config';

import Nav from './Nav.jsx';
import Isotope from './Isotope.jsx';
import Tile from './Tile.jsx';

/* TODO: Move to methods */
function getActive ( tiles = [] ) {
  check( tiles, Array );

  const now = Date.parse( new Date( ) );
  return tiles.filter(
    tile => (
      !( tile.type  === 'activity' && tile.timestamp < now ) &&
         tile.badge !== 'CANCELLED' &&
         tile.badge !== 'CLOSED'
    )
  );
}

function getUniqueValues ( collection = [], key = '' ) {
  check( collection, Array );
  check( key,        String );

  return collection.reduce( ( carry, item ) => {
    if ( item[ key ] && !~carry.indexOf( item[ key ] ) ) {
      carry.push( item[ key ] );
    }

    return carry;
  }, [] ).sort();
}

export default class Grid extends Component {
  render ( ) {
    let tiles = getActive( this.props.tiles );
    let categories    = getUniqueValues( tiles, 'type' );
    let subcategories = getUniqueValues( tiles, 'activityType' );

    /* Add reset filter */
    categories.push( null );

    return (
      <main className = "container-fluid" id = "main" >
        <Nav isotope = { ( ) => this._isotope } categories = { categories } subcategories = { subcategories } />
        <Isotope
          key = 'isotope'
          className = { 'row row-flex tile isotope' }
          elementType = { 'ul' }
          options = { config }
          disableImagesLoaded = { true }
          ref = { c => this._isotope = c }
        >
          { tiles.map( tile => ( <Tile key = { tile.key } tile = { tile } /> ) ) }
        </Isotope>
      </main>
    );
  }
}

Grid.propTypes = {
  tiles: PropTypes.array
}
