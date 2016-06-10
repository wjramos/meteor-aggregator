import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// Tile component - represents a single todo item
export default class Nav extends Component {

  filterClick ( event ) {
      const $tileContainer =  $( '.isotope' );
      const filterValue = event.target.getAttribute( 'data-category' );

      return $tileContainer.isotope( { filter: filterValue } );
  }

  renderFilters ( ) {
    let key = 'type';
    let categories = this.props.tiles.reduce( ( carry, item ) => {
      if ( item[ key ] && !~carry.indexOf( item[ key ] ) ) {
        carry.push( item[ key ] );
      }

      return carry;

    }, [] ).sort();

    // Append 'reset option'
    categories.push( null );

    return categories.map(
      category => {
        return (
            <a href = "#main"
               key = { category || 'all' }
               className = "filter-item"
               data-category = { category ? '.' + category : '*' }
               onClick={ this.filterClick.bind( this ) }>{ category ? category.charAt(0).toUpperCase() + category.substr(1) : 'Show All' }</a>
        );
      }
    )
  }

  render ( ) {
    return (
      <nav className = "filters js-filters">
        <label>Filter By:</label>
        { this.renderFilters( ) }
      </nav>
    );
  }
}

Nav.propTypes = {
  tiles: PropTypes.array
};
