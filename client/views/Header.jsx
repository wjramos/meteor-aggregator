import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import classnames from "classnames";

export default class Header extends Component {
  render ( ) {
    return (
      <header className = "container-fluid">
        <div className = "row">
          <div className = "col-xs-12 text-center">
          
            {/* TODO: Make headings authorable outside */}
            <h1 className = "heading-announce">United Outside</h1>
            <section className = "row">
              <div className = "col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1">
                <h3 className = "text-uppercase text-justify text-last-center">We hold these truths to be self evident, that all people are equal outside. That the outdoors is the antidote to a stressful world. That laughter rings louder in fresh air. And that mother nature dishes out fun like political rivals sling mud.</h3>
              </div>
            </section>
            <section className = "row">
              <div className = "col-xs-2 col-xs-offset-5 vertical-pull-xl">
                <a href = "https://rei.com"
                   target = "_blank">
                  <img src = "/img/co-op.svg"
                       alt = "Sponsored by REI Co-op&trade;"/>
                </a>
              </div>
            </section>
          </div>
        </div>
      </header>
    );
  }
}
