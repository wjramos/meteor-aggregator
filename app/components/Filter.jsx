import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

function filterClick ( event ) {
  const filterValue = event.target.getAttribute( 'data-category' );
  return $( '.isotope' ).isotope( { filter: filterValue } );
}

function getFilterSelector ( filter ) {
  return filter ? '.' + filter : '*';
}

function getFilterLabel ( filter ) {
  return filter ? filter.charAt(0).toUpperCase() + filter.substr(1) : 'Show All';
}

export default Filter = ( { category } ) => (
  <a href = "#main"
     key = { category || 'all' }
     className = "filter-item"
     data-category = { getFilterSelector( category ) }
     onClick = { filterClick }>{ getFilterLabel( category ) }</a>
);
