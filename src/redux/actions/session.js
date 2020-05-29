import { SESSION_LOG_OUT, WEB_LOADED, WEB_LOADING, SESSION_LOG_IN } from "./actionsType";
import { createToken } from "../../api/apiToken";

export const closeSession = () => {
    const { localStorage } = window;

    localStorage.removeItem('session');

    return { type: SESSION_LOG_OUT };
};

/**
 * @param {FormData} data
 */
export const openSession = (data) => (dispatch) =>{
    dispatch({type: WEB_LOADING});

    const user = {
        username: data.get('username'),
        password: data.get('password'),
    };

    return createToken(user)
        .then((response) => {
            dispatch({type: WEB_LOADED});
            dispatch({ type: SESSION_LOG_IN, session: response.data })

            return response;
        })
        .catch((error) => {
            dispatch({type: WEB_LOADED});

            throw error;
        });
};

export const initSessionByLocal = () => (dispatch) => {
    const { localStorage } = window;

    const session = localStorage && localStorage.getItem('session') && JSON.parse(localStorage.getItem('session'));

    if (! session) return;

    dispatch({type: SESSION_LOG_IN, session});
};
