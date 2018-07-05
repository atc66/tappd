import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addLocation } from "../../actions/locationActions";
// Addition
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      lat: "",
      lng: "",
      description: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;

    console.log(user.name);

    const newLocation = {
      title: this.state.title,
      name: user.name,
      lat: this.state.lat,
      lng: this.state.lng,
      description: this.state.description
    };
    this.props.addLocation(newLocation);
    this.setState({ title: "", lat: "", lng: "", description: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <section className="section-profile-header">
        <div>
          <div className="box">
            <h2>Add a Happy Hour</h2>
            <div>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Name of Location"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                    info="The name of the location, eg. McGillin's  Olde Ale House "
                    required
                  />
                  <TextFieldGroup
                    placeholder="Latitude"
                    name="lat"
                    value={this.state.lat}
                    onChange={this.onChange}
                    error={errors.lat}
                    info="Latitude of Location"
                  />
                  <TextFieldGroup
                    placeholder="Longitude"
                    name="lng"
                    value={this.state.lng}
                    onChange={this.onChange}
                    error={errors.lng}
                    info="Longitude of Location"
                  />
                  <TextAreaFieldGroup
                    placeholder="A short description of their specials"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="Tell us some of their specials."
                  />
                </div>
                <button type="submit" className="btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

LocationForm.propTypes = {
  addLocation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addLocation }
)(LocationForm);
