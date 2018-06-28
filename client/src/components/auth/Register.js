import React, { Component } from "react";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
  }

  render() {
    return (
      <section>
        <div className="row">
          <div className="row">
            <h2>Sign Up</h2>
          </div>
          <div className="row">
            <h3 className="form-header">Create your DevConnector account</h3>
          </div>
          <div className="row">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col span-1-of-3">
                  <label htmlFor="name">Name</label>
                </div>
                <div className="col span-2-of-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Your Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col span-1-of-3">
                  <label htmlFor="email">Email</label>
                </div>
                <div className="col span-2-of-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Your Email Address"
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
                <div className="col span-1-of-3">
                  <label htmlFor="password2">Confirm Password</label>
                </div>
                <div className="col span-2-of-3">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Match Password"
                    name="password2"
                    value={this.state.password2}
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

export default Register;
