import React from 'react';
import { mount } from 'react-mounter';

import Page from './layouts/page';
import Grid from './containers/grid';

FlowRouter.route( '/', {
  name: 'Home',
  action( ) {
    mount( Page, {
      content: <Grid />
    } );
  }
} );

FlowRouter.route( '/health', {
  name: 'Health'
} );
