import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tiles } from '../api/tiles';

import Tile from './Tile.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      hideCompleted: true
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
      hideCompleted: !this.state.hideCompleted,
    } );
  }

  renderTiles ( ) {
    let filteredTiles = this.props.tiles;
    {/*
    if ( this.state.hideCompleted ) {
      filteredTiles = filteredTiles.filter( tile => !tile.checked );
    }
    */}
    return filteredTiles.map(
      tile => {
        const currentUserId = this.props.currentUser && this.props.currentUser._id;
        const showPrivateButton = tile.owner === currentUserId;

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
      <header className = "container-fluid">
        <div className = "row">
          <div className = "col-xs-12 text-center">
            <div className = "card">
              {/* TODO: Make headings authorable */}
              <h1 className = "heading-announce">United Outside</h1>
              <h3 className = "text-uppercase">Scelerisque consectetur consequat porta aenean in taciti phasellus congue facilisi lacus nascetur fusce...</h3>

              {/* TODO: Toggle "Past Events" visibility -- Only visible to admin */}
              {/*
              <label className = "hide-completed">
                <input
                  type    = "checkbox"
                  checked = { this.state.hideCompleted }
                  onClick = { this.toggleHideCompleted.bind( this ) }
                  readOnly
                />
                Hide Completed Events
              </label>
              */}
              {/* TODO: Create admin route -- remove this */}
              {/* <AccountsUIWrapper /> */}

              {/* TODO: Display admin status */}
              {/*
              { this.props.currentUser ?
                <form className = "new-tile"
                      onSubmit  = { this.handleSubmit.bind( this ) }
                  >
                  <input
                    type        = "text"
                    ref         = "textInput"
                    placeholder = "Type to add new tiles"
                  />
                </form> : ''
              */}
            </div>
          </div>
        </div>
      </header>
    );
  }

  renderMain ( ) {
    return (
      <main className = "container-fluid">
        <ul className = "row row-flex tile masonry">
          { this.renderTiles() }
        </ul>
      </main>
    );
  }
  renderNav ( ) {
    return (
      <section  className = "container-fluid overlay-dark-2">
        <nav    className = "row row-flex">
          <form className = "col-xs-12 text-center text-uppercase">
            <fieldset>
              <label>Filter By:</label>
              <div className = "btn-group inline-group">
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
  tiles:           PropTypes.array.isRequired,
  currentUser:     PropTypes.object,
};

export default createContainer(
  () => {
    Meteor.subscribe('tiles');
    Meteor.subscribe('events');

    return {
      tiles:           Tiles.find( {}, { sort: { createdAt: -1 } } ).fetch(),
      currentUser:     Meteor.user(),
    };
  },
  App
);
