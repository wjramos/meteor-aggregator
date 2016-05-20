// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

// import { createContainer } from 'meteor/react-meteor-data';

import Tile from './Tile.jsx';

export default class Grid extends Component {

  renderTiles ( ) {
    const tiles = this.props.tiles;

    return tiles.map(
    tile => (
        <Tile
          type = { tile.type }
          key = { tile.key }
          timestamp = { tile.timestamp }
          title = { tile.title }
          link = { tile.link }
          caption = { tile.caption }
          media = { tile.media }
          badge = { tile.badge }
          label = { tile.label }
        />
      )
    );
  }

    // renderSocial ( ) {
    //     let tiles = this.props.social;
    //
    //     return tiles.map(
    //       tile => {
    //         return (
    //           <Tile
    //             type        = 'social'
    //             key         = { tile.id }
    //             timestamp   = { tile.timestamp * 1000 }
    //             title       = { tile.user.username }
    //             link        = { tile.url }
    //             caption     = { tile.caption }
    //             media       = { tile.photo.original.url }
    //             tile        = { tile }
    //           />
    //         )
    //       }
    //     );
    // }
    //
    // renderEvents ( ) {
    //     let tiles = this.props.events;
    //     let now = Date.parse( new Date() );
    //
    //     return tiles.map(
    //       tile => {
    //         let timestamp = Date.parse( tile.start );
    //
    //         if ( timestamp > now && tile.registration.status !== 'CLOSED' ) {
    //           return (
    //             <Tile
    //               type        = 'events'
    //               key         = { tile.sessionId }
    //               timestamp   = { timestamp }
    //               label       = { this.getDateStr( tile ) }
    //               title       = { tile.title }
    //               link        = { 'https://rei.com' + tile.uri }
    //               caption     = { tile.summary }
    //               badge       = { tile.registration.status }
    //               media       = 'http://placehold.it/350x150'
    //               tile        = { tile }
    //             />
    //           )
    //         }
    //       }
    //     );
    // }
    //
    // renderPosts ( ) {
    //     let tiles = this.props.posts;
    //
    //     return tiles.map(
    //       tile => {
    //         if ( tile.status === 'publish' ) {
    //           let timestamp = Date.parse( tile.date );
    //
    //           return (
    //             <Tile
    //               key         = { tile.id }
    //               type        = 'blog'
    //               timestamp   = { timestamp }
    //               label       = 'blog'
    //               //start     = { new Date( timestamp ) }
    //               title       = { tile.title }
    //               link        = { tile.url }
    //               caption     = { tile.excerpt }
    //               media       = { tile.attachments[0].images.featured_banner.url }
    //               tile        = { tile }
    //             />
    //           );
    //         }
    //       }
    //     );
    // }

    render ( ) {
        return (
            <div className = 'row row-flex tile js-isotope'>
              { this.renderTiles() }
              {/* { this.renderEvents() }
              { this.renderPosts() }
              { this.renderSocial() } */}
            </div>
        )
    }
}


Grid.propTypes = {
  tiles: PropTypes.array,
  // events: PropTypes.array,
  // social: PropTypes.array,
  // posts:  PropTypes.array,
  // currentUser: PropTypes.object,
};
