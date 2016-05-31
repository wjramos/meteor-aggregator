import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
// import classnames from 'classnames';

// Tile component - represents a single todo item
export default class Nav extends Component {
  render ( ) {
    return (
      <nav className = "filters js-filters">
        <label class = "hidden-xs">Filter By:</label>
        {/* TODO: Generate these */}
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = ".events">Activities</button>
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = ".events">Events</button>
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = ".social">Social</button>
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = ".blog">Blog</button>
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = ".media">Photos</button>
        <button type = "button"
                className = "btn btn-xs text-uppercase filter-item"
                data-category = "*">Show All</button>
      </nav>
    );
  }
}
