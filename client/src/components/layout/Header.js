import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <div className="row">
            <a href="header.html">
              <i className="fas fa-beer logo" />
            </a>
            <ul className="main-nav js--main-nav">
              <li>
                <a href="landing.html">tapprs</a>
              </li>
              <li>
                <a href="#works">How it Works</a>
              </li>
              <li>
                <a href="#cities">Cities</a>
              </li>
              <li>
                <a href="register.html">Sign Up</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="hero-text-box">
          <h1>No more indecision. Find your Happy Hour.</h1>
          <a className="btn btn-full js--scroll-to-plans" href="register.html">
            Sign Up
          </a>
          <a className="btn btn-ghost" href="#works">
            Show me more
          </a>
        </div>
      </header>
    );
  }
}

export default Header;
