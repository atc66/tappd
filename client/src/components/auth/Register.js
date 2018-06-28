import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <section>
        <div className="row">
          <div className="row">
            <h2>Sign Up</h2>
          </div>
          <div className="row">
            <h3 className="form-header">Create your Tappd account</h3>
          </div>
          <div className="row">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col span-1-of-3">
                  <label htmlFor="name">Name</label>
                </div>
                <div className="col span-2-of-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col span-1-of-3">
                  <label htmlFor="email">Email</label>
                </div>
                <div className="col span-2-of-3">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col span-1-of-3">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col span-2-of-3">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col span-1-of-3">
                  <label htmlFor="password2">Confirm Password</label>
                </div>
                <div className="col span-2-of-3">
                  <input
                    type="password"
                    placeholder="Match Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
