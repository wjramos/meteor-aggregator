import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Tile component - represents a single todo item
export default class Nav extends Component {
  render ( ) {
    return (
      <nav    className = "row row-flex">
        <form className = "col-xs-12">
          <fieldset className = "text-center text-uppercase">
            <label>Filter By:</label>
            <div className = "btn-group js-filters">

              {/* TODO: Generate these */}
              <button type="button"
                      className = "btn btn-xs text-uppercase filter-item"
                      data-category = ".events">Activities</button>
              <button type="button"
                      className = "btn btn-xs text-uppercase filter-item"
                      data-category = ".events">Events</button>
              <button type="button"
                      className = "btn btn-xs text-uppercase filter-item"
                      data-category = ".social">Social</button>
              <button type="button"
                      className = "btn btn-xs text-uppercase filter-item"
                      data-category = ".blog">Blog</button>
              <button type="button"
                      className = "btn btn-xs text-uppercase filter-item"
                      data-category = ".media">Photos</button>
              <button type="button"
                      className = "btn btn-xs text-uppercase filter-item"
                      data-category = "*">Show All</button>

            </div>
          </fieldset>
        </form>
      </nav>
    );
  }
}
