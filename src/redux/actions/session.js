import { SESSION_LOG_OUT, WEB_LOADED, WEB_LOADING } from "./actionsType";
import { createToken } from "../../api/apiToken";

export const closeSession = () => {
    return { type: SESSION_LOG_OUT };
};

/**
 * @param {FormData} data
 * @param {string} username 
 * @param {string} password 
 */
export const openSession = (data) => (dispatch) =>{
    dispatch({type: WEB_LOADING});

    return createToken(data)
        .then((response) => {
            dispatch({type: WEB_LOADED});

            return response;
        })
        .catch((error) => {
            dispatch({type: WEB_LOADED});

            throw error;
        });
};
