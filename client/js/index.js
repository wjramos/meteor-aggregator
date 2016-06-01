$( () => {
    let $header = $( 'header' );
    let $win    = $( window );
    let $nav    = $( 'nav' );

    let headerOffset = $header.scrollTop() + $header.height();

    $win.scroll( () => {
        if ( $win.scrollTop() >= headerOffset ) {
            $nav.addClass( 'fixed' );
        }
        else {
            $nav.removeClass( 'fixed' );
        }
    } );
} );
