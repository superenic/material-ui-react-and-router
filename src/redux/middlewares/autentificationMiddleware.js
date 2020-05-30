import { WEB_ERROR, SESSION_LOG_OUT } from '../actions/actionsType'

const authentificationMiddleware = store => next => action => {
    let result = next(action);

    switch (action.type)
    {
        case WEB_ERROR:
            const { error } = action;
            if (error.response.status === 401)
                // close session when token is not valid more.
                store.dispatch({ type: SESSION_LOG_OUT });

            break
        default: return result;
    }
}

export default authentificationMiddleware;