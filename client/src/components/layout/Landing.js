import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div>
        <section className="section-features" id="features">
          <div className="row">
            <h2>Go somewhere new &mdash; not across the street</h2>
            <p className="long-copy">
              Hello, we're Tappd, your new premium Happy Hour finder. We know
              you're always busy. No time for search for specials. So let us
              take care of that, we're really good at it, we promise!
            </p>
          </div>

          <div className="row">
            <div className="col span-1-of-3 box">
              <i className="far fa-calendar-alt icon-big" />
              <h3> Up to 365 days/year </h3>
              <p>
                Every day of the week! We really mean that. Someone is having a
                special and we include 365 days/year coverage.
              </p>
            </div>
            <div className="col span-1-of-3 box">
              <i className="fas fa-utensils icon-big" />
              <h3> Where do you want to go?</h3>
              <p>
                Do you hate that question? Me too. We want you to be 100% happy.
                No one likes missing half off apps, or going to that bar that
                sells $9 domestics.
              </p>
            </div>
            <div className="col span-1-of-3 box">
              <i className="fas fa-glass-martini icon-big" />
              <h3> 100% Adjustable </h3>
              <p>
                Is that special no longer happening? Are we missing the newest
                pub? We are customer driven vote for your favorite spot, and if
                we don't have it let us know!
              </p>
            </div>
          </div>
        </section>
        <section className="section-cities" id="cities">
          <div className="row">
            <h2>We're currently in Philadelphia</h2>
          </div>
          <div className="row">
            <figure className="city-photo city-feature" />
            <h3 className="city-feature">Philadelphia</h3>
            <div className="city-feature">
              <i className="fas fa-building icon-small" />
              300+ bars
            </div>
            <div className="city-feature">
              <i className="fas fa-users icon-small" />
              500 + users
            </div>
            <div className="city-feature">
              <i className="fab fa-twitter icon-small" />
              <a href="#">@tappd_phl</a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Landing;
