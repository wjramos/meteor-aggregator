import React, { Component, PropTypes } from 'react';
import { assign } from 'lodash';

const isBrowser = !!window;
const Isotope = isBrowser ? Isotope || window.Isotope : null;
const imagesloaded = isBrowser ? require( 'imagesloaded' ) : null;
const refName = 'isotopeContainer';

export default class IsotopeComponent extends Component {
  constructor ( props, context ) {
    super( props, context );

    this.displayName = 'IsotopeComponent';
    this.isotope     = false;
    this.domChildren = [];
  }

  initializeIsotope ( force ) {
    if ( !this.isotope || force ) {
      this.isotope = new Isotope(
        this.refs[ refName ],
        this.props.options
      );

      this.domChildren = this.getNewDomChildren();
    }
  }

  getNewDomChildren ( ) {
    const node = this.refs[ refName ];
    const children = this.props.options.itemSelector ? node.querySelectorAll( this.props.options.itemSelector ) : node.children;

    return Array.prototype.slice.call( children );
  }

  diffDomChildren ( ) {
    /*
     * take only elements attached to DOM
     * (aka the parent is the isotope container, not null)
     */
    const oldChildren = this.domChildren.filter( element => !!element.parentNode );
    const newChildren = this.getNewDomChildren();
    const removed = oldChildren.filter( oldChild => !~newChildren.indexOf( oldChild ) );
    const domDiff = newChildren.filter( newChild => !~oldChildren.indexOf( newChild ) );

    let beginningIndex = 0;

    // get everything added to the beginning of the DOMNode list
    const prepended = domDiff.filter( ( newChild, i ) => {
      const prepend = beginningIndex === newChildren.indexOf( newChild );

      if ( prepend ) {
        // increase the index
        beginningIndex++;
      }

      return prepend;
    } );

    // we assume that everything else is appended
    const appended = domDiff.filter( el => prepended.indexOf( el ) === -1 );

    /*
     * otherwise we reverse it because so we're going through the list picking off the items that
     * have been added at the end of the list. this complex logic is preserved in case it needs to be
     * invoked
     *
     * const endingIndex = newChildren.length - 1;
     *
     * domDiff.reverse().filter( ( newChild, i ) => {
     *   const append = endingIndex == newChildren.indexOf(newChild);
     *
     *   if ( append ) {
     *     endingIndex--;
     *   }
     *
     *   return append;
     * } );
     */

    // get everything added to the end of the DOMNode list
    let moved = [];

    if ( removed.length === 0 ) {
      moved = oldChildren.filter( ( child, index ) => index !== newChildren.indexOf( child ) );
    }

    this.domChildren = newChildren;

    return {
      old:       oldChildren,
      new:       newChildren,
      removed:   removed,
      appended:  appended,
      prepended: prepended,
      moved:     moved
    };
  }

  performLayout ()  {
    const diff = this.diffDomChildren();

    if ( diff.removed.length > 0 ) {
      this.isotope.remove( diff.removed );
      this.isotope.reloadItems();
    }

    if ( diff.appended.length > 0 ) {
      this.isotope.appended( diff.appended );

      if ( diff.prepended.length === 0 ) {
        this.isotope.reloadItems();
      }
    }

    if ( diff.prepended.length > 0 ) {
      this.isotope.prepended( diff.prepended );
    }

    if ( diff.moved.length > 0 ) {
      this.isotope.reloadItems();
    }

    this.isotope.layout();
  }

  imagesLoaded ( ) {
    if ( this.props.disableImagesLoaded ) {
      return;
    }

    imagesloaded(
      this.refs[ refName ],
      instance => {
        if ( this.props.onImagesLoaded ) {
          this.props.onImagesLoaded( instance );
        }

        this.isotope.layout();
      }
    );
  }

  componentDidMount ( ) {
    this.initializeIsotope();
    this.imagesLoaded();
  }

  componentDidUpdate ( ) {
    this.performLayout();
    this.imagesLoaded();
  }

  componentWillReceiveProps ( ) {
    this._timer = setTimeout( ( ) => {
      this.isotope.reloadItems();
      this.isMounted && this.isMounted() && this.forceUpdate();
    } );
  }

  componentWillUnmount ( ) {
    clearTimeout( this._timer );
    this.isotope.destroy();
  }

  render ( ) {
    return React.createElement( this.props.elementType, assign( {}, this.props, { ref: refName } ), this.props.children );
  }
}

IsotopeComponent.propTypes = {
  disableImagesLoaded: PropTypes.bool,
  onImagesLoaded:      PropTypes.func,
  options:             PropTypes.object
};

IsotopeComponent.defaultProps = {
  disableImagesLoaded: false,
  options:             {},
  className:           '',
  elementType:         'div'
};
