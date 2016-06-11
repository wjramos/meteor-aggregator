import React from 'react';
import Header from '../components/Header.jsx';

const PageLayout = ( { content } ) => (
    <section>
        <Header />
        { content }
    </section>
);

export default PageLayout;
