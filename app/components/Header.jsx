import React, { Component, PropTypes } from "react";
import { STAR_SRC, TITLE, LEAD, LOGO_HREF, LOGO_SRC, LOGO_ALT } from '../../imports/content'

export default Header = ( ) => (
  <header className = "container-fluid">
    <div className = "row row-flex">
      <div className = "col-xs-4 col-sm-3 col-md-2">
        <div className = "row row-flex nowrap">
          <div className = "col-sm-4">
            <div className = "well-sm">
              <img className = "img-responsive" src = { STAR_SRC } />
            </div>
          </div>
          <div className = "col-sm-4">
            <div className = "well-sm">
              <img className = "img-responsive" src = { STAR_SRC } />
            </div>
          </div>
          <div className = "col-sm-4">
            <div className = "well-sm">
              <img className = "img-responsive" src = { STAR_SRC } />
            </div>
          </div>
        </div>
      </div>
      <div className = "col-xs-12">
        <h1>{ TITLE }</h1>
      </div>
      <div className = "col-xs-10 col-md-8">
        <h2 className = "text-uppercase text-last-center text-justify">{ LEAD }</h2>
      </div>
      <div className = "col-xs-12 vertical-pull-xl">
        <a href = { LOGO_HREF }
           target = "_blank">
          <img className = "logo"
               src = { LOGO_SRC }
               alt = { LOGO_ALT }/>
        </a>
      </div>
    </div>
  </header>
);
