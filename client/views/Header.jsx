import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Tile component - represents a single todo item
export default class Header extends Component {
  render ( ) {
    return (
      <header className = 'container-fluid'>
        <div className = 'row'>
          <div className = 'col-xs-12 text-center'>
            {/* TODO: Make headings authorable */}
            <h1 className = 'heading-announce'>United Outside</h1>
            <section className = 'row'>
              <div className = 'col-xs-12 col-sm-8 col-sm-offset-2'>
                <h3 className = 'text-uppercase text-justify text-last-center'>We believe the outdoors are the antidote to a stressful, divisive world. That’s why between June 13 and the Grand Opening of our flagship store on Sept. 30, we’ll convene more than 100 outdoor events in the DC area that encourage residents to put their differences aside and experience the cathartic power of spending time outdoors with others.</h3>
              </div>
            </section>
            <section className = 'row'>
              <div className = 'col-xs-2 col-xs-offset-5 vertical-pull-xl'>
                <a href = 'https://rei.com'
                   target = '_blank'>
                  <img src = '/img/co-op.svg'
                       alt = 'Sponsored by REI Co-op&trade;'/>
                </a>
              </div>
            </section>

            {/* TODO: Toggle 'Past Events' visibility -- Only visible to admin */}
            {/*
            <label className = 'hide-completed'>
              <input
                type    = 'checkbox'
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
              <form className = 'new-tile'
                    onSubmit  = { this.handleSubmit.bind( this ) }
                >
                <input
                  type        = 'text'
                  ref         = 'textInput'
                  placeholder = 'Type to add new tiles'
                />
              </form> : ''
            */}
          </div>
        </div>
      </header>
    );
  }
}
