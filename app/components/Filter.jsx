import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

function filterApply ( filter ) {
  return $( '.isotope' ).isotope( { filter: filter } );
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
     onClick = { ( ) => filterApply( getFilterSelector( category ) ) }>{ getFilterLabel( category ) }</a>
);
