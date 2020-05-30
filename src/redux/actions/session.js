import { SESSION_LOG_OUT, WEB_LOADED, WEB_LOADING, SESSION_LOG_IN, WEB_ERROR } from "./actionsType";
import { createToken } from "../../api/apiToken";
import { closeToken } from '../../api/apiToken';
import moment from "moment";

export const closeSession = (session) => (dispatch) => {
    dispatch({type: WEB_LOADING});
    const goodResponse = (response) => {
        dispatch({type: WEB_LOADED});
        dispatch({ type: SESSION_LOG_OUT });

        const { localStorage } = window;
        localStorage.removeItem('session');

        return response;
    };

    return closeToken(session)
        .then(goodResponse)
        .catch((error) => {
            if (error.response.status === 401)
                return goodResponse(error.response);
            
            dispatch({type: WEB_LOADED});
            dispatch({type: WEB_ERROR, error});

            throw error;
        });

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
    const rememberToken = data.get('remember_token');
    const mm = moment;

    return createToken(user)
        .then((response) => {
            response.data.expire_at = mm().utc().add(response.data.expired_in, 'minutes').toISOString();

            dispatch({type: WEB_LOADED});
            dispatch({ type: SESSION_LOG_IN, session: response.data })

            const {localStorage} = window;
            if ( localStorage && rememberToken ) {
                localStorage.setItem('session', JSON.stringify({ ...response.data }));
            }

            return response;
        })
        .catch((error) => {
            dispatch({type: WEB_LOADED});
            dispatch({type: WEB_ERROR, error});

            throw error;
        });
};

export const initSessionByLocal = () => (dispatch) => {
    const { localStorage } = window;

    const session = localStorage && localStorage.getItem('session') && JSON.parse(localStorage.getItem('session'));

    if (! session) return;

    dispatch({type: SESSION_LOG_IN, session});
};
