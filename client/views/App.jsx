import React, { Component, PropTypes } from 'react';
import ReactDOM   from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Events, Posts, Social } from '../../imports/collections';

import Header from './Header.jsx';
import Nav    from './Nav.jsx';
import Tile   from './Tile.jsx';

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

  renderSocial ( ) {
    let tiles = this.props.social;

    return tiles.map(
      tile => {
        return (
          <Tile
            type        = 'social'
            key         = { tile.id }
            time        = { tile.timestamp * 1000 }
            title       = { tile.user.username }
            link        = { tile.url }
            description = { tile.caption }
            media       = { tile.photo.original.url }
            tile        = { tile }
          />
        )
      }
    );
  }

  renderEvents ( ) {
    let tiles = this.props.events;
    let now = Date.parse( new Date() );

    return tiles.map(
      tile => {
        let timestamp = Date.parse( tile.start );

        if ( timestamp > now && tile.registration.status !== 'CLOSED' ) {
          return (
            <Tile
              type        = 'events'
              key         = { tile.sessionId }
              time        = { timestamp }
              title       = { tile.title }
              link        = { 'https://rei.com' + tile.uri }
              description = { tile.summary }
              media       = 'http://placehold.it/350x150'
              tile        = { tile }
            />
          )
        }
      }
    );
  }

  renderPosts ( ) {
    let tiles = this.props.posts;

    return tiles.map(
      tile => {
        if ( tile.status === 'publish' ) {
          let timestamp = Date.parse( tile.date );

          return (
            <Tile
              key         = { tile.id }
              type        = 'blog'
              time        = { timestamp }
              title       = { tile.title }
              link        = { tile.url }
              description = { tile.excerpt }
              media       = { tile.attachments[0].images.featured_banner.url }
              tile        = { tile }
            />
          );
        }
      }
    );
  }

  renderHeader ( ) {
    return ( <Header /> );
  }

  renderMain ( ) {
    return (
      <main  className = "container-fluid">
        <div className = "row row-flex tile js-isotope">
          { this.renderEvents() }
          { this.renderPosts() }
          { this.renderSocial() }
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
  events: PropTypes.array,
  social: PropTypes.array,
  posts:  PropTypes.array,
  // currentUser: PropTypes.object,
};

export default createContainer(
  ( ) => {
      Meteor.subscribe( 'social.public' );
      Meteor.subscribe( 'events.public' );
      Meteor.subscribe( 'posts.public' );

      return {
        // social:          social,
        // currentUser:     Meteor.user(),
        social: Social.find( {}, { sort: { createdAt: -1 } } ).fetch(),
        events: Events.find( {}, { sort: { createdAt: -1 } } ).fetch(),
        posts:  Posts.find(  {}, { sort: { createdAt: -1 } } ).fetch()
      };
  },
  App
);
