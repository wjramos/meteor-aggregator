import React, { Component, PropTypes } from 'react';
import ReactDOM   from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Social } from '../../imports/api/social';

//Sample Data
import { curalateData } from '../../imports/data/curalate';

import Tile   from './Tile.jsx';
import Header from './Header.jsx';
import Nav    from './Nav.jsx';
// import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor ( props ) {
    super( props );

    // this.state = {
    //   hideExpired: true
    // };
  }

  // handleSubmit ( event ) {
  //   event.preventDefault();
  //
  //   // Find the text field via the React ref
  //   const text = ReactDOM.findDOMNode( this.refs.textInput ).value.trim();
  //
  //   Meteor.call( 'tiles.insert', text );
  //
  //   // Clear form
  //   ReactDOM.findDOMNode( this.refs.textInput ).value = '';
  // }

  // toggleHideCompleted ( ) {
  //   this.setState( {
  //     hideExpired: !this.state.hideExpired,
  //   } );
  // }

  renderTiles ( ) {
    let tiles = this.props.tiles;
    return tiles.map(
      tile => (
        <Tile
          key  = { tile._id }
          tile = { tile }
        />
      )
    );
  }

  renderHeader ( ) {
    return ( <Header /> );
  }

  renderMain ( ) {
    return (
      <main  className = "container-fluid">
        <div className = "row row-flex tile grid js-isotope"
             data-isotope = "{ 'itemSelector': '.grid-item', 'masonry': { 'columnWidth': 200 } }">
          { this.renderTiles() }
        </div>
      </main>
    );
  }
  renderNav ( ) {
    return (
      <section className = "container-fluid overlay-dark-2">
        <Nav />
      </section>
    );
  }

  render ( ) {
    return (
      <div>
        { this.renderHeader() }
        { this.renderNav() }
        { this.renderMain() }
      </div>
    );
  }
}

App.propTypes = {
  tiles:      PropTypes.array.isRequired,
  // currentUser: PropTypes.object,
};

export default createContainer(
  function() {
    // Meteor.subscribe( 'social' );
    let social = Meteor.subscribe( 'social' );

    if ( social.ready( ) ){
      return {
        // social:          social,
        // currentUser:     Meteor.user(),
        tiles: curalateData.items//Social.find( {}, { sort: { createdAt: -1 } }).fetch(),
      };
    }
  },
  App
);
