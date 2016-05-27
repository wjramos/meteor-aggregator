import React, {Component, PropTypes} from 'react';
import Tile from './Tile.jsx';

export default class Grid extends Component {

  renderTiles ( ) {
    const tiles = this.props.tiles;

    return tiles.map(
      tile => {

        if ( tile.badge !== 'CANCELLED' &&
             tile.badge !== 'CLOSED' ) {

          return (
            <Tile
              masonry      = { this.masonry }
              type         = { tile.type }
              key          = { tile.key }
              timestamp    = { tile.timestamp }
              relTimestamp = { tile.relTimestamp }
              title        = { tile.title }
              link         = { tile.link }
              caption      = { tile.caption }
              media        = { tile.media }
              badge        = { tile.badge }
              label        = { tile.label }
            />
          );
        }
      }
    );
  }

  render ( ) {
    let masonry;

        return (
            <div className={ 'row row-flex tile' }
                 elementType={ 'ul' }
                //     ref = { function( c ) { return c ? this.masonry = c.masonry : null }.bind( this ) }
                //options     = { config }
                //disableImagesLoaded = { false }
            >
                { this.renderTiles() }
            </div>
        )
    }

    initIsotope () {
        var $container = $( '.tile' );
        $container.isotope( {
            itemSelector:      '.item',
            columnWidth:       5,
            isJQueryFiltering: true,
            initLayout:        false
        } );
        //$container.one( 'arrangeComplete', function () {
        console.log( 'arrange is complete' );
        $( '.js-filters' ).on( 'click', 'button', function () {
            var filterValue = $( this ).attr( 'data-category' );
            console.log( 'button clicked' );
            // use filterFn if matches value
            filterValue = filterValue;
            $container.isotope( { filter: filterValue } );
        } );

        //} );
        $container.isotope();
    }

    removeIsotope () {
        $( '.tile' ).isotope( 'destroy' );
    }

    componentDidMount () {
        this.initIsotope();
    }

    componentWillUpdate () {
        this.removeIsotope();
    }

    componentDidUpdate () {
        this.initIsotope();
    }

    componentWillUnmount () {
        this.removeIsotope();
    }
}


Grid.propTypes = {
  tiles: PropTypes.array,
  // currentUser: PropTypes.object,
};
