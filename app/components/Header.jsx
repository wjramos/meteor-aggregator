import React, { Component, PropTypes } from "react";
import { STAR_SRC, TITLE, LEAD, LOGO_HREF, LOGO_SRC, LOGO_ALT } from '../../imports/content'

export default Header = ( ) => (
  <header className = "container-fluid">
    <div className = "row">
      <div className = "hidden-xs col-sm-4 col-sm-offset-4">
        <div className = "row row-flex">
          <div className = "col-sm-4">
            <div className = "well">
              <img className = "img-responsive" src = { STAR_SRC } />
            </div>
          </div>
          <div className = "col-sm-4">
            <div className = "well">
              <img className = "img-responsive" src = { STAR_SRC } />
            </div>
          </div>
          <div className = "col-sm-4">
            <div className = "well">
              <img className = "img-responsive" src = { STAR_SRC } />
            </div>
          </div>
        </div>
      </div>
      <div className = "col-xs-12">
        <h1>{ TITLE }</h1>
        <section className = "row">
          <div className = "col-xs-8 col-xs-offset-2">
            <h2 className = "text-uppercase text-last-center text-justify">{ LEAD }</h2>
          </div>
        </section>
        <section className = "row">
          <div className = "col-xs-3 col-xs-offset-5 col-sm-2 col-sm-offset-5 vertical-pull-xl">
            <a href = { LOGO_HREF }
               target = "_blank">
              <img src = { LOGO_SRC }
                   alt = { LOGO_ALT }/>
            </a>
          </div>
        </section>
      </div>
    </div>
  </header>
);
