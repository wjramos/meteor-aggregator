import React, { Component, PropTypes } from "react";
import { TITLE, LEAD, LOGO_ALT } from '../../imports/content'

export default class Header extends Component {
  render ( ) {
    return (
      <header className = "container-fluid">
        <div className = "row">
          <div className = "col-xs-12 text-center">
            <h1 className = "heading-announce">{ TITLE }</h1>
            <section className = "row">
              <div className = "col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1">
                <h3 className = "text-uppercase text-justify text-last-center">{ LEAD }</h3>
              </div>
            </section>
            <section className = "row">
              <div className = "col-xs-2 col-xs-offset-5 vertical-pull-xl">
                <a href = "https://rei.com"
                   target = "_blank">
                  <img src = "/img/co-op.svg"
                       alt = { LOGO_ALT }/>
                </a>
              </div>
            </section>
          </div>
        </div>
      </header>
    );
  }
}
