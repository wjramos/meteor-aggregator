let document = window.document;

var sticky = {
  init ( ) {
    this.nav;
    this.stickyAfter = 2000;
    
    setTimeout( ( ) => {
      this.nav = document.getElementsByTagName( 'nav' )[0];
      this.stickyAfter = this.nav.getBoundingClientRect().top + document.body.scrollTop;
      this.scroll();
    }, 500 );

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
