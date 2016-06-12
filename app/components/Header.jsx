import React, { Component, PropTypes } from "react";
import { TITLE, LEAD, LOGO_HREF, LOGO_SRC, LOGO_ALT } from '../../imports/content'

export default Header = ( ) => (
  <header className = "container-fluid">
    <div className = "row">
      <div className = "col-xs-12">
        <h1 className = "heading-announce">{ TITLE }</h1>
        <section className = "row">
          <div className = "col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1">
            <h3 className = "text-uppercase text-last-center text-justify">{ LEAD }</h3>
          </div>
        </section>
        <section className = "row">
          <div className = "col-xs-2 col-xs-offset-5 vertical-pull-xl">
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
