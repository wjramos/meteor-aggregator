require( 'unveil2/dist/jquery.unveil2.min' );

//         var isotope = {
//             itemSelector: '.item',
//             layoutMode: 'masonry',
//             masonry: {
//                 gutter: 20,
//                 isFitWidth: true
//             },
//             sortBy: [ 'time', 'category' ],
//             sortAscending: false,
//             getSortData: {
//                 category: '[ data-category ]',
//                 time: '[ data-time ] parseInt'
//             },
//             filter: '*'
//         }
//

// $(
//     function () {
//         var $grid = $( '.js-isotope' );
//         var $filters = $( '.js-filters' );

//         $grid.each( function () {
//             $( this )
//                 .isotope( isotope );
//         } );
//
//         $filters.on( 'click', 'button', function () {
//             var $this = $( this );
//             isotope.filter = $this.attr( 'data-category' );
//             return $grid.each( function () {
//                 $this.isotope( isotope );
//             } );
//         } );
//     }
// );

var config = {
    itemSelector: '.item',
    layoutMode: 'masonry',
    masonry: {
        columnWidth: 5,
    },
    sortBy: [ 'time', 'category' ],
    sortAscending: false,
    getSortData: {
        category: '[ data-category ]',
        time: '[ data-time ] parseInt'
        // date: function ( $elem ) {
        //     return $elem.find( '.date' ).text(); // Date format should be [Y-m-d H:i]
        // },
        // views: function ( $elem ) {
        //     return parseInt( $elem.attr( 'data-views' ), 10 );
        // },
        // //featured : function ( $elem ) {
        // // return $elem.attr('data-featured');
        // //  },
        // rates: function ( $elem ) {
        //     return parseInt( $elem.attr( 'data-rates' ), 10 );
        // },
        // comments: function ( $elem ) {
        //     return parseInt( $elem.attr( 'data-comments' ), 10 );
        // }
    }

};

jQuery( document ).ready( function ( $ ) {
    var $win = $( window );
    var $grid = $( '.js-isotope' );
    var $filters = $( '.js-filters' );
    var $images = $grid.find( 'img' );

    $images.each( function ( index ) {
        var $cur = $( this );
        var height = $cur.attr( 'height' );
        $cur.parent().parent().css( 'height', height );
    } );

    $grid.isotope( config );

    $grid.on( 'layoutComplete', function () {
        $win.trigger( 'scroll' );
    } );

    $filters.find( 'button' ).click( function () {
            var $this = $( this );
            if ( $this.parent().hasClass( 'selected' ) ) {
                return false;
            }
            var $optionSet = $this.parents();
            $optionSet.find( '.selected' ).removeClass( 'selected' );
            $this.addClass( 'selected' );
            var sortName = $this.attr( 'href' ).slice( 1 );

            $grid.isotope( {
                sortBy: sortName
            } );

            return false;
        } );


    $images.unveil( {
        failure_limit: Math.max( $images.length - 1, 0 )
    } )
} );
