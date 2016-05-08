import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tiles } from '../api/tiles';

import Tile from './Tile.jsx';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      hideExpired: true
    };
  }

  handleSubmit ( event ) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode( this.refs.textInput ).value.trim();

    Meteor.call( 'tiles.insert', text );

    // Clear form
    ReactDOM.findDOMNode( this.refs.textInput ).value = '';
  }

  toggleHideCompleted ( ) {
    this.setState( {
      hideExpired: !this.state.hideExpired,
    } );
  }

  renderTiles ( ) {
    let filteredTiles = this.props.tiles;
    {/*
    if ( this.state.hideExpired ) {
      filteredTiles = filteredTiles.filter( tile => !tile.expired );
    }
    */}
    return filteredTiles.map(
      tile => {
        const currentUserId = this.props.currentUser && this.props.currentUser._id;
        // const showPrivateButton = tile.owner === currentUserId;

        return (
          <Tile
            key               = { tile._id }
            tile              = { tile }
            showPrivateButton = { showPrivateButton }
          />
        );
      }
    );
  }

  renderHeader ( ) {
    return (
      <Header />
    );
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
  tiles:       PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(
  () => {
    Meteor.subscribe( 'tiles' );

    return {
      tiles:           Tiles.find( {}, { sort: { createdAt: -1 } } ).fetch(),
      currentUser:     Meteor.user(),
    };
  },
  App
);
