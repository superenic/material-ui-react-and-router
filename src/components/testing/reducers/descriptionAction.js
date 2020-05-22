import {
    ADD_DESCRIPTION,
    REMOVE_DESCRIPTION,
    GET_LIST,
} from './types';

export const listAdd = (description) => {
    return { type: ADD_DESCRIPTION, description };
}

export const listRemove = (row) => {
    return { type: REMOVE_DESCRIPTION, row };
}

export const getList = (rows) => {
    return { type: GET_LIST, rows };
}
