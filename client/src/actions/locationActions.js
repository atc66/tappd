import axios from "axios";

import {
  ADD_LOCATION,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_LOCATIONS,
  LOCATION_LOADING,
  GET_LOCATION,
  DELETE_LOCATION
} from "./types";

// ADD LOCATION
export const addLocation = locationData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/locations", locationData)
    .then(res =>
      dispatch({
        type: ADD_LOCATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET_LOCaTIONS
export const getLocations = () => dispatch => {
  dispatch(setLocationLoading());
  axios
    .get("/api/locations")
    .then(res =>
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_LOCATIONS,
        payload: null
      })
    );
};

// GET_LOCTION
export const getLocation = id => dispatch => {
  dispatch(setLocationLoading());
  axios
    .get(`/api/locations/${id}`)
    .then(res =>
      dispatch({
        type: GET_LOCATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_LOCATION,
        payload: null
      })
    );
};

// Delete Location
export const deleteLocation = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/locations/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_LOCATION,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// ADD like
export const addLike = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/locations/like/${id}`)
    .then(res => dispatch(getLocations()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// REMOVE like
export const removeLike = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/locations/unlike/${id}`)
    .then(res => dispatch(getLocations()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// ADD Comment
export const addComment = (locationId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/locations/comment/${locationId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_LOCATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// DELETE Comment
export const deleteComment = (locationId, commentId) => dispatch => {
  axios
    .delete(`/api/locations/comment/${locationId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_LOCATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set loading state
export const setLocationLoading = () => {
  return {
    type: LOCATION_LOADING
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
