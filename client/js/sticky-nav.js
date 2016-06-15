let document = window.document;

var sticky = {
  init ( ) {
    this.nav = document.getElementsByTagName( 'nav' )[0];
    this.scroll();
    this.events();
  },

  scroll ( ) {
    this.stickyAfter = this.nav.getBoundingClientRect().top + document.body.scrollTop;

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
