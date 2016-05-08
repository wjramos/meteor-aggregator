import WP from 'wordpress-rest-api';
import endpoints from './endpoints';

let collection = new Mongo.Collection( 'wp' );

function getPosts ( endpoint, resolve ) {
    const wp = new WP( { endpoint: endpoint } );

    // Promises
    wp.posts( )
    .then(
        data => {
            collection.insert( data );
            return resolve( );
        }
    ).catch(
        err => {
            console.error( err );
        }
    );
}

let requests = endpoints.wp.map(
    endpoint => new Promise(
        resolve => asyncFunction( endpoint, resolve )
    )
);

Promise.all( requests );
