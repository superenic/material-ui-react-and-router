import initialState from "../initialState";
import { SESSION_LOG_IN, SESSION_LOG_OUT } from "../actions/actionsType";
import Time from "../../components/common/libraries/Time";

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
                expire_at: null,
            };
        case SESSION_LOG_IN:
            const { session } = action;
            const { expires_in, expire_at, access_token, refresh_token } = session;

            return {
                ...state,
                created_at: new Time(new Date()).convertToUtcTimestamp(),
                expires_in,
                expire_at,
                access_token,
                refresh_token,
            };
        default: return state;
    }
  }