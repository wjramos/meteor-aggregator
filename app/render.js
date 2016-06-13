import React from 'react';
import { mount } from 'react-mounter';

import Page from './layouts/page';
import Grid from './containers/grid';

FlowRouter.route( '/', {
  name: 'Home',
  subscriptions ( params, queryParams ) {
    this.register( 'tiles', Meteor.subscribe( 'tiles' ) );
  },
  action ( ) {
    mount( Page, {
      Grid: <Grid />
    } );
  }
} );

FlowRouter.route( '/health', {
  name: 'Health'
} );
