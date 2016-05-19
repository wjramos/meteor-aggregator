import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { createContainer } from 'meteor/react-meteor-data';

import { months } from '../../imports/util/months';

import Tile from './Tile.jsx';

export default class Grid extends Component {
    getDateStr ( tile ) {
        let start;
        let end;
        let startDate = new Date( tile.start );
        let endDate   = new Date( tile.end );
        let date = '';

        if ( tile.start ) {
          start = {
            date: startDate.getDate(),
            month: months[ startDate.getMonth() ]
          }

          date += `${ start.month } ${ start.date }`;
        }

        if ( tile.end ) {
          end = {
            date: endDate.getDate(),
            month: months[ endDate.getMonth() ]
          }

          if ( end.month !== start.month || end.date !== start.date ) {
            date += ' - ';
          }
          if ( end.month !== start.month ) {
            date += `${ end.month } `;
          }

          if ( end.date !== start.date ) {
            date += end.date;
          }
        }

        return date;
    }

    renderSocial ( ) {
        let tiles = this.props.social;

        return tiles.map(
          tile => {
            return (
              <Tile
                type        = 'social'
                key         = { tile.id }
                timestamp   = { tile.timestamp * 1000 }
                title       = { tile.user.username }
                link        = { tile.url }
                caption     = { tile.caption }
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
                  timestamp   = { timestamp }
                  label       = { this.getDateStr( tile ) }
                  title       = { tile.title }
                  link        = { 'https://rei.com' + tile.uri }
                  caption     = { tile.summary }
                  badge       = { tile.registration.status }
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
                  timestamp   = { timestamp }
                  label       = 'blog'
                  //start     = { new Date( timestamp ) }
                  title       = { tile.title }
                  link        = { tile.url }
                  caption     = { tile.excerpt }
                  media       = { tile.attachments[0].images.featured_banner.url }
                  tile        = { tile }
                />
              );
            }
          }
        );
    }

    render ( ) {
        return (
            <div className = 'row row-flex tile js-isotope'>
              { this.renderEvents() }
              { this.renderPosts() }
              { this.renderSocial() }
            </div>
        )
    }
}


Grid.propTypes = {
  events: PropTypes.array,
  social: PropTypes.array,
  posts:  PropTypes.array,
  // currentUser: PropTypes.object,
};
