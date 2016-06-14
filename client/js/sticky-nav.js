$ = $ || window.jQuery || require( 'jquery2' );

$( () => {
    let $header = $( 'header' );
    let $win    = $( window );
    let $nav    = $( 'nav' );

    // BAD: MAGIC NUMBER
    let headerOffset = 465;

    $win.scroll( () => {
        if ( $win.scrollTop() >= headerOffset ) {
            $nav.addClass( 'fixed' );
        }
        else {
            $nav.removeClass( 'fixed' );
        }
    } );
} );
