import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import ReactDOM   from 'react-dom';

import { Tiles } from '../../lib/collections';

import Header from './Header.jsx';
import Nav    from './Nav.jsx';
import Grid   from './Grid.jsx';


class App extends Component {

  renderHeader ( ) {
    return (
      <Header />
    );
  }

  renderMain ( ) {
    return (
      <main  className = 'container-fluid'>
        <Grid tiles = { this.props.tiles } />
      </main>
    );
  }

  renderNav ( ) {
    return (
      <section className = 'container-fluid overlay-dark-2'>
        <Nav tiles = { this.props.tiles } />
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
  tiles: PropTypes.array
};

export default createContainer(
  ( ) => {
      Meteor.subscribe( 'tiles.public' );

      return {
        tiles: Tiles.find( {}, { sort: { relTimestamp: 1 } } ).fetch()
      };
  },
  App
);
