import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

function triggerScroll ( ) {
  const event = document.createEvent( 'Event' );
  event.initEvent( 'scroll', true, false );
  document.dispatchEvent( event );
}

function filterApply ( ref, filter ) {
  triggerScroll( );
  return new ref().isotope.arrange( { filter: filter } );
}

function getFilterSelector ( filter ) {
  return filter ? '.' + filter : '*';
}

function getFilterLabel ( filter ) {
  return filter ? filter.charAt(0).toUpperCase() + filter.substr(1) : 'Show All';
}

export default Filter = ( { isotope, category } ) => (
  <a href = "#main"
     key = { category || 'all' }
     className = "filter-item"
     onClick = { ( ) => filterApply( isotope, getFilterSelector( category ) ) }>{ getFilterLabel( category ) }</a>
);
