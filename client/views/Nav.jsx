import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// Tile component - represents a single todo item
export default class Nav extends Component {

  filterClick ( event ) {
      const $tileContainer =  $( '.isotope' );
      const filterValue = event.target.getAttribute( 'data-category' );

      return $tileContainer.isotope( { filter: `.${ filterValue }` } );
  }

  renderFilters ( ) {
    let key = 'type';
    let categories = this.props.tiles.reduce( ( carry, item ) => {
      if ( item[ key ] && !~carry.indexOf( item[ key ] ) ) {
        carry.push( item[ key ] );
      }

      return carry;

    }, [] ).sort();


    return categories.map(
      category => {
        return (
            <a href = "#main"
               key = { category }
               className = "btn btn-xs text-uppercase filter-item"
               data-category = { category }
               onClick={ this.filterClick.bind( this ) }>{ category.charAt(0).toUpperCase() + category.substr(1) }</a>
        );
      }
    )
  }

  render ( ) {
    return (
      <nav className = "filters js-filters">
        <label class = "hidden-xs">Filter By:</label>

        { this.renderFilters( ) }

        <a href = "#main"
           className = "btn btn-xs text-uppercase filter-item"
           data-category = "*"
           onClick={ this.filterClick }>Show All</a>
      </nav>
    );
  }
}

Nav.propTypes = {
  tiles: PropTypes.array
};
