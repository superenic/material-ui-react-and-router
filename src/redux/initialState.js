import { WEB_LOADED } from "./actions/actionsType";

export default {
    list: [],
    loadings: 0,
    webLoad: WEB_LOADED,
    session: {
        token_type: null,
        expires_in: null,
        access_token: null,
        refresh_token: null,
        expire_at: null,
    },
};
