import { WEB_LOADING, WEB_LOADED } from "../actions/actionsType";

/**
 * TODO: use initialization values fomr initialSate file.
 * 
 * @param {string} state 
 * @param {{type:string}} action 
 */
const webLoad = (state = 'WEB_LOADED', action) => {
    switch (action.type) {
        case WEB_LOADING:
            return WEB_LOADING;
        case WEB_LOADED:
            return WEB_LOADED;
        default: return state;
    }
};

export default webLoad;