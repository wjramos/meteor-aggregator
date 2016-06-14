// $ = $ || window.jQuery || require( 'jquery2' );
Meteor.startup( () => smoothScroll.init() );

var sticky = {
  stickyAfter: document.getElementsByTagName( 'nav' )[0].getBoundingClientRect().top + document.body.scrollTop,
  init ( ) {
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
