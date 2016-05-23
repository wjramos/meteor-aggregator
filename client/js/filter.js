import { jQuery as $ } from 'meteor/jquery';

const config = {
  itemSelector: '.item',
  layoutMode: 'masonry',
  masonry: {
    columnWidth: 5,
  },
  sortBy: ['timestamp', 'category'],
  sortAscending: false,
  getSortData: {
    category: '[ data-category ]',
    time: '[ data-timestamp ] parseInt'
  }

};

Meteor.defer( () => {
  const $win = $( window );
  const $grid = $( '.js-isotope' );
  const $filters = $( '.js-filters' );

  $grid.isotope( config );
  $grid.imagesLoaded().progress( () => $grid.isotope( 'layout' ) );
  $grid.on( 'layoutComplete', () => $win.trigger( 'scroll') );

  $filters.find( 'button' ).click( () => {
    const $this = $( this );
    const sort = $this.data( 'category' );
    const $optionSet = $this.parents();

    if ($this.parent().hasClass( 'active' ) ) {
      return false;
    }

    $optionSet.find( '.active' ).removeClass( 'active' );
    $this.addClass( 'active' );

    $grid.isotope( {
      sortBy: sort
    } );

    return false;
  } );
} );
