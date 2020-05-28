import initialState from "../initialState";
import { SESSION_LOG_IN, SESSION_LOG_OUT } from "../actions/actionsType";

/**
 * @param {{loggedIn:boolean}} state 
 * @param {{loggedIn:boolean}} action 
 */
export default function session(
    state = initialState.session,
    action
  ) {
    switch (action.type) {
        case SESSION_LOG_OUT:
            return {
                ...state,
                expires_in: null,
                access_token: null,
                refresh_token: null,
            };
        case SESSION_LOG_IN:
            const {session} = action;

            return {
                ...state,
                expires_in: session.expires_in,
                access_token: session.access_token,
                refresh_token: session.refresh_token,
            };
        default: return state;
    }
  }