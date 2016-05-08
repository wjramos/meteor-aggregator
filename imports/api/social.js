import { Meteor } from 'meteor/meteor';
import { Mongo }  from 'meteor/mongo';
import { SOCIAL } from './endpoints';

export const Social = new Mongo.Collection( 'social' );

const INTERVAL = 5000;
const OPTIONS  = {};

if ( Meteor.isServer ) {
    Meteor.publish(
        'social',
        function( ) {
            // let self = this;
            // const publishedKeys = {};

            // const poll = () => {
            try {
                // // Let's assume the data comes back as an array of JSON documents, with an _id field, for simplicity
                // const response = HTTP.get( SOCIAL, OPTIONS );
                //
                // response.data.items.forEach(
                //     item => {
                //         // if ( !publishedKeys[ item.id ] ) {
                //         //     publishedKeys[ item.id ] = true;
                //         //     if ( !Social.find( { id: item.id } ) ) {
                //         //         Social.insert( item );
                //         //     }
                //         // }
                //         if ( publishedKeys[ item.id ] ) {
                //             this.changed( 'social', item.id, item );
                //         } else {
                //             publishedKeys[ item.id ] = true;
                //
                //             if ( publishedKeys[ item.id ] ) {
                //                 this.added( 'social', item.id, item );
                //             }
                //         }
                //     }
                // );

                var response = HTTP.get( SOCIAL, OPTIONS );

                _.each( response.data.items, item => {
                    let len  = 200;

                    let post = {
                        id:            item.id,
                        // url:           data.url,
                        // domain:        data.domain,
                        // comment_count: data.num_comments,
                        // permalink:     data.permalink,
                        // title:         data.title,
                        // selftext:      false,
                        // thumbnail:     false
                    };

                    // if ( data.selftext !== '' ) {
                    //     post.selftext = data.selftext.substr( 0, len )
                    // }
                    //
                    // if ( data.thumbnail !== 'self' && Meteor.call( 'isUrl', data.thumbnail ) ) {
                    //     post.thumbnail = data.thumbnail
                    // }

                    this.added( 'posts', Random.id(), post );
                } );

                this.ready();
            } catch ( e ) { console.error( e ) };
            // };

            // poll();
            // this.ready();
            //
            // const interval = Meteor.setInterval( poll, INTERVAL );
            //
            // this.onStop( () => {
            //     Meteor.clearInterval( interval );
            // } );

            // return Social.find( );
        }
    );
}

Meteor.methods( {
    isUrl: function( url ) {
        return /^https?:\/\//.test( url );
    }
} );
