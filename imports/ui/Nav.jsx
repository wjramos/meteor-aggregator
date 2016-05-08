import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Tile component - represents a single todo item
export default class Nav extends Component {
  render ( ) {
    return (
      <nav    className = "row row-flex">
        <form className = "col-xs-12 text-center text-uppercase">
          <fieldset>
            <label>Filter By:</label>
            <div className = "btn-group">

              {/* TODO: Generate these */}
              <button type="button" className = "btn btn-xs text-uppercase">Activities</button>
              <button type="button" className = "btn btn-xs text-uppercase">Events</button>
              <button type="button" className = "btn btn-xs text-uppercase">Blog</button>
              <button type="button" className = "btn btn-xs text-uppercase">Photos</button>
              <button type="button" className = "btn btn-xs text-uppercase">Show All</button>

            </div>
          </fieldset>
        </form>
      </nav>
    );
  }
}
