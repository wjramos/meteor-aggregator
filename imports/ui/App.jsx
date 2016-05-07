import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks';

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      hideCompleted: false
    };
  }

  handleSubmit ( event ) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode( this.refs.textInput ).value.trim();

    Meteor.call( 'tasks.insert', text );

    // Clear form
    ReactDOM.findDOMNode( this.refs.textInput ).value = '';
  }

  toggleHideCompleted ( ) {
    this.setState( {
      hideCompleted: !this.state.hideCompleted,
    } );
  }

  renderTasks ( ) {
    let filteredTasks = this.props.tasks;
    if ( this.state.hideCompleted ) {
      filteredTasks = filteredTasks.filter( task => !task.checked );
    }
    return filteredTasks.map(
      task => {
        const currentUserId = this.props.currentUser && this.props.currentUser._id;
        const showPrivateButton = task.owner === currentUserId;

        return (
          <Task
            key               = { task._id }
            task              = { task }
            showPrivateButton = { showPrivateButton }
          />
        );
      }
    );
  }

  render ( ) {
    return (
      <div>
        {/* TODO: Separate components */}
        <header className = "container">
          <div className = "col-xs-12 text-center">
            <div className = "card">
              {/* TODO: Make headings authorable */}
              <h1 className = "heading-announce">United Outside</h1>
              <h2>Scelerisque consectetur consequat porta aenean in taciti phasellus congue facilisi lacus nascetur fusce...</h2>

              {/* TODO: Toggle "Past Events" visibility */}
              {/*
              <label className = "hide-completed">
                <input
                  type    = "checkbox"
                  checked = { this.state.hideCompleted }
                  onClick = { this.toggleHideCompleted.bind( this ) }
                  readOnly
                />
                Hide Completed Tasks
              </label>
              */}
              {/* TODO: Create admin route -- remove this */}
              <AccountsUIWrapper />

              {/* TODO: Display admin status */}
              {/*
              { this.props.currentUser ?
                <form className = "new-task"
                      onSubmit  = { this.handleSubmit.bind( this ) }
                  >
                  <input
                    type        = "text"
                    ref         = "textInput"
                    placeholder = "Type to add new tasks"
                  />
                </form> : ''
              */}
            </div>
          </div>
        </header>
        
        <section>
          <nav>
            <ul>

            </ul>
          </nav>
        </section>

        <main className = "container">
          <ul className = "row row-flex tile masonry">
            { this.renderTasks() }
          </ul>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  tasks:           PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser:     PropTypes.object,
};

export default createContainer(
  () => {
    Meteor.subscribe('tasks');

    return {
      tasks: Tasks.find( {}, { sort: { createdAt: -1 } } ).fetch(),
      incompleteCount: Tasks.find( { checked: { $ne: true } } ).count(),
      currentUser: Meteor.user(),
    };
  },
  App
);
