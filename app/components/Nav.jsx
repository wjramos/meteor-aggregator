import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Filter from './Filter.jsx';

export default class Nav extends Component {
  render ( ) {
    const key = 'type';
    const categories = this.props.tiles.reduce( ( carry, item ) => {
      if ( item[ key ] && !~carry.indexOf( item[ key ] ) ) {
        carry.push( item[ key ] );
      }

      return carry;

    }, [] ).sort();

    // Append 'reset option'
    categories.push( null );

    const filters = categories.map(
      category => {
        return (
          <Filter key = { category }
                  category = { category }
          />
        );
      }
    );

    return (
      <nav className = "filters js-filters">
        <label>Filter By:</label>
        { filters }
      </nav>
    );
  }
}

Nav.propTypes = {
  tiles: PropTypes.array
};
