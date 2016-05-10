import React, { Component, PropTypes } from 'react';
import ReactDOM   from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// import { Social } from '../../imports/api/social';

//Sample Data
import { eventsData }   from '../../imports/data/events';
import { curalateData } from '../../imports/data/curalate';

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
    let social = this.props.social;

    return social.map(
      tile => {
        return ( <Tile
          type        = 'social'
          key         = { tile.id }
          time        = { tile.timestamp }
          title       = { tile.user.username }
          description = { tile.caption }
          tile        = { tile }
        /> )
      }
    );
  }

  renderEvents ( ) {
    let events = this.props.events;
    let now = Date.parse( new Date() );

    return events.map(
      tile => {
        let timestamp = Date.parse( tile.start );

        if ( timestamp > now && tile.registration.status !== 'CLOSED' ) {

          return ( <Tile
            type        = 'events'
            key         = { tile.sessionId }
            time        = { timestamp }
            title       = { tile.title }
            description = { tile.summary }
            tile        = { tile }
            status      = { tile.registration.status }
          /> )
        }
      }
    );
  }

  // renderPosts ( ) {
  //   let posts = this.props.posts;
  //
  //   return posts.map(
  //     tile => {
  //       return ( <Tile
  //         key         = { tile.id }
  //         type        = 'social'
  //         time        = { tile.start }
  //         title       = { tile.user.username }
  //         description = { tile.caption }
  //         tile        = { tile }
  //       /> )
  //     }
  //   );
  // }

  renderHeader ( ) {
    return ( <Header /> );
  }

  renderMain ( ) {
    return (
      <main  className = "container-fluid">
        <div className = "row row-flex tile grid js-isotope"
             data-isotope = "{ 'itemSelector': '.grid-item', 'masonry': { 'columnWidth': 200 } }">
          { this.renderEvents() }
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
  events:      PropTypes.array.isRequired,
  social:      PropTypes.array.isRequired,
  // currentUser: PropTypes.object,
};

export default createContainer(
  function() {
    // Meteor.subscribe( 'social' );
    // let social = Meteor.subscribe( 'social' );

    // if ( social.ready( ) ){
      return {
        // social:          social,
        // currentUser:     Meteor.user(),
        events: eventsData.events,//Events.find( {}, { sort: { createdAt: -1 } }).fetch()
        social: curalateData.items//Social.find( {}, { sort: { createdAt: -1 } }).fetch(),
      };
    // }
  },
  App
);
