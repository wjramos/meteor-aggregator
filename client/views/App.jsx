import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import ReactDOM   from 'react-dom';

import { Events, Posts, Social } from '../../imports/collections';

import Header from './Header.jsx';
import Nav    from './Nav.jsx';
import Grid   from './Grid.jsx';

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

  renderHeader ( ) {
    return (
      <Header />
    );
  }

  renderMain ( ) {
    return (
      <main  className = 'container-fluid'>
        <Grid events = { this.props.events }
              social = { this.props.social }
              posts  = { this.props.posts } />
      </main>
    );
  }

  renderNav ( ) {
    return (
      <section className = 'container-fluid overlay-dark-2'>
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
        social: Social.find( {}, { sort: { createdAt: -1 } } ).fetch(),
        events: Events.find( {}, { sort: { createdAt: -1 } } ).fetch(),
        posts:  Posts.find(  {}, { sort: { createdAt: -1 } } ).fetch(),
        // currentUser:     Meteor.user(),
      };
  },
  App
);
