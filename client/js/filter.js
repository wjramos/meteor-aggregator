$(
  function () {
    var $grid = $( '.js-isotope' );
    var $filters = $( '.js-filters' );
    var isotope = {
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
            gutter: 20,
            isFitWidth: true
        },
        sortBy: [ 'time', 'category' ],
        sortAscending: false,
        getSortData: {
            category: '[ data-category ]',
            time: '[ data-time ] parseInt'
        },
        filter: '*'
    }
console.log( isotope.filter );
    $grid.each( function ( ) {
        $( this ).isotope( isotope );
    } );

    $filters.on( 'click', 'button', function () {
        var $this = $( this );
        isotope.filter = $this.attr( 'data-category' );
console.log( isotope.filter );
        return $grid.each( function () {
          $( this ).isotope( isotope );
        } );
    } );
  }
);
