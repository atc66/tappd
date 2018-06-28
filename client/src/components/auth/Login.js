import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
  }

  render() {
    return (
      <section>
        <div className="row">
          <div className="row">
            <h2>Log In</h2>
          </div>
          <div className="row">
            <h3 className="form-header">Sign in to your Tappd account</h3>
          </div>
          <div className="row">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col span-1-of-3">
                  <label htmlFor="name">Email</label>
                </div>
                <div className="col span-2-of-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col span-1-of-3">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col span-2-of-3">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row">
                <input type="submit" className="form-submit" />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
