import React from 'react';
import Header from '../components/Header.jsx';

const PageLayout = ( { Grid } ) => (
    <section>
        <Header />
        { Grid }
    </section>
);

export default PageLayout;
