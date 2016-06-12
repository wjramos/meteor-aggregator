import React, { Component, PropTypes } from 'react';

import Filter from './Filter.jsx';

export default Nav = ( { categories } ) => (
    <nav className = "filters js-filters">
        <label>Filter By:</label>
        { categories.map( category => ( <Filter key = { category } category = { category } /> ) ) }
    </nav>
);
