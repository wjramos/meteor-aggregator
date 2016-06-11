// import React, { Component, PropTypes } from 'react';
// import { Meteor } from 'meteor/meteor';
//
// export default class Filter extends Component {
//   filterClick ( event ) {
//     const filterValue = event.target.getAttribute( 'data-category' );
//
//     return $( '.isotope' ).isotope( { filter: filterValue } );
//   }
//
//   render ( ) {
//     return (
//       <a href = "#main"
//          key = { this.props.category || 'all' }
//          className = "filter-item"
//          data-category = { this.props.category ? '.' + this.props.category : '*' }
//          onClick = { this.filterClick.bind( this ) }>{ this.props.category ? this.props.category.charAt(0).toUpperCase() + this.props.category.substr(1) : 'Show All' }</a>
//      );
//   }
// }
//
// Filter.propTypes = {
//   category: PropTypes.string
// };
