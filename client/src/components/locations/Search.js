import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addLocation } from "../../actions/locationActions";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      errorMessage: "",
      latitude: null,
      longitude: null,
      isGeocoding: false,
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

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: ""
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: "",
      latitude: null,
      longitude: null
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status);
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const { address, errorMessage, latitude, longitude, errors } = this.state;

    return (
      <div className="box">
        <section className="section-profile-header">
          <h2>Are we missing one? Add a happy hour here</h2>
          <PlacesAutocomplete
            onChange={this.handleChange}
            value={address}
            onSelect={this.handleSelect}
            onError={this.handleError}
            shouldFetchSuggestions={address.length > 2}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => {
              return (
                <div className="box">
                  <div>
                    <input
                      {...getInputProps({
                        placeholder:
                          "Type your favorite bar here to get its location"
                      })}
                    />
                    {this.state.address.length > 0 && (
                      <button onClick={this.handleCloseClick}>
                        Start Over
                      </button>
                    )}
                  </div>
                  {suggestions.length > 0 && (
                    <div>
                      {suggestions.map(suggestion => {
                        const className = classnames("suggestion", {
                          "suggestion-item--active": suggestion.active
                        });
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className
                            })}
                          >
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{" "}
                            <small>
                              {suggestion.formattedSuggestion.secondaryText}
                            </small>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }}
          </PlacesAutocomplete>
          {errorMessage.length > 0 && <div>{this.state.errorMessage}</div>}

          <div>
            <div className="box">
              <div>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <span>{address}</span>
                    <TextFieldGroup
                      id="title"
                      placeholder="Copy the name listed above"
                      name="title"
                      value={this.state.title}
                      onChange={this.onChange}
                      error={errors.title}
                    />
                    <span>{latitude}</span>
                    <TextFieldGroup
                      id="latitude"
                      placeholder="Now copy the latitude too"
                      name="lat"
                      value={this.state.lat}
                      onChange={this.onChange}
                      error={errors.lat}
                    />
                    <span>{longitude}</span>
                    <TextFieldGroup
                      id="longitude"
                      placeholder="Almost there, every latitude needs a longitude..."
                      name="lng"
                      value={this.state.lng}
                      onChange={this.onChange}
                      error={errors.lng}
                    />

                    <TextAreaFieldGroup
                      placeholder="Ok, last thing. What are the specials?"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      error={errors.bio}
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
      </div>
    );
  }
}

Search.propTypes = {
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
)(Search);
