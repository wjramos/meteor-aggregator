// $ = $ || window.jQuery || require( 'jquery2' );

var sticky = {
  init ( ) {
    this.nav = document.getElementsByTagName( 'nav' )[0];
    this.stickyAfter = this.nav.getBoundingClientRect().top + document.body.scrollTop;
    this.scroll();
    this.events();
  },

  scroll ( ) {
    if ( window.scrollY > this.stickyAfter ) {
      document.body.classList.add( 'fixed' );
    } else {
      document.body.classList.remove( 'fixed' );
    }
  },

  events ( ) {
    window.addEventListener( 'scroll', ( ) => this.scroll( ) );
  }
};

document.addEventListener( 'DOMContentLoaded', sticky.init.bind( sticky ) );
