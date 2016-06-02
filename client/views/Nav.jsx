import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// import classnames from 'classnames';

// Tile component - represents a single todo item
export default class Nav extends Component {

    filterClick( event ) {
        var $tileContainer =  $( '.isotope')
        var filterValue = event.target.getAttribute('data-category');
        $tileContainer.isotope( { filter: filterValue } );
    }

  render ( ) {
    return (
      <nav className = "filters js-filters">
        <label class = "hidden-xs">Filter By:</label>
        {/* TODO: Generate these */}
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = ".events"
                onClick={ this.filterClick }>Activities</button>
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = ".events"
                onClick={ this.filterClick }>Events</button>
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = ".social"
                onClick={ this.filterClick }>Social</button>
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = ".blog"
                onClick={ this.filterClick }>Blog</button>
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = ".media"
                onClick={ this.filterClick }>Photos</button>
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = "*"
                onClick={ this.filterClick }>Show All</button>
      </nav>
    );
  }
}
