var config = {
    itemSelector: '.item',
    layoutMode: 'masonry',
    masonry: {
        columnWidth: 5,
    },
    sortBy: [ 'timestamp', 'category' ],
    sortAscending: false,
    getSortData: {
        category: '[ data-category ]',
        time: '[ data-timestamp ] parseInt'
    }

};

jQuery( document ).ready( function ( $ ) {
    var $win = $( window );
    var $grid = $( '.js-isotope' );
    var $filters = $( '.js-filters' );

    // var elem = document.querySelector('.js-isotope');
    // var iso = new Isotope( elem, {
    //   // options
    //   itemSelector: '.item',
    //   layoutMode: 'masonry'
    // });
    $grid.isotope( config );
    $grid.imagesLoaded().progress( function() {
      $grid.isotope( 'layout' );
    } );

    $grid.on( 'layoutComplete', function () {
        $win.trigger( 'scroll' );
    } );

    $filters.find( 'button' ).click( function () {
        var $this = $( this );
        var sort = $this.data( 'category' );
        var $optionSet = $this.parents();

        if ( $this.parent().hasClass( 'active' ) ) {
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
