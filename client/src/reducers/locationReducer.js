import {
  ADD_LOCATION,
  GET_LOCATIONS,
  LOCATION_LOADING,
  GET_LOCATION,
  DELETE_LOCATION
} from "../actions/types";

const initialState = {
  locations: [],
  location: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOCATION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false
      };
    case GET_LOCATION:
      return {
        ...state,
        location: action.payload,
        loading: false
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [action.payload, ...state.locations]
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          location => location._id !== action.payload
        )
      };
    default:
      return state;
  }
}
