import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// Tile component - represents a single todo item
export default class Nav extends Component {

    filterClick ( event ) {
        const $tileContainer =  $( '.isotope' );
        const filterValue = event.target.getAttribute( 'data-category' );

        return $tileContainer.isotope( { filter: filterValue } );
    }

    menuShow(event) {
        var target = event.target.getAttribute( 'data-category' );
        if ( target.includes( 'activity' ) ) {
            $( ".activity-submenu" ).insertAfter("a[data-category='.activity']").show();
        }
    }

    menuHide() {
        $( ".activity-submenu" ).hide();
    }

  renderFilters ( filterKey ) {
    let key = filterKey;
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
               data-category = { '.' + category }
               onTouchStart = { this.menuShow }
               onMouseEnter = { this.menuShow }
               onClick = { this.filterClick.bind( this ) }>{ category.charAt(0).toUpperCase() + category.substr(1) }</a>
        );
      }
    )
  }

  render ( ) {
    return (
      <nav className = "filters js-filters">
        <label class = "hidden-xs">Filter By:</label>

        { this.renderFilters( 'type' ) }

        <a href = "#main"
           className = "btn btn-xs text-uppercase filter-item"
           data-category = "*"
           onClick={ this.filterClick }>Show All</a>

        <div className = "activity-submenu"
           onMouseLeave = { this.menuHide }>
          { this.renderFilters( 'activityType' ) }
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  tiles: PropTypes.array
};
