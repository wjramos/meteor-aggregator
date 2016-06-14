import React, { Component, PropTypes } from 'react';

import Filter from './Filter.jsx';

export default Nav = ( { isotope, categories, subcategories } ) => (
    <nav className = "filters js-filters">
        <label>Filter By:</label>
        { categories.map(
            category => (
                <Filter key = { category }
                        isotope = { isotope }
                        category = { category }
                />
            )
        ) }
    </nav>
);
