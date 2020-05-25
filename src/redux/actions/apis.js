import { BEGIN_API_CALL, API_CALL_ERROR } from "./actionsType";

export const sendingData = () => {
    return {type: BEGIN_API_CALL};
}

export const sendingError = () => {
    return {type: API_CALL_ERROR};
}
