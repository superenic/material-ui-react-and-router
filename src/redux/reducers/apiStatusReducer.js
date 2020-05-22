import * as types from "../actions/actionsType";
import initialState from "../initialState";

/**
 * Verify type action and end word SUCCESS.
 * 
 * @private
 * @param {string} type 
 * @returns {boolean}
 */
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

/**
 * Reducer for request.
 * 
 * @param {number} state Beginner states
 * @param {Object} action 
 * @returns {number}
 */
export default function apiCallStatusReducer(
  state = initialState.loadings,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
