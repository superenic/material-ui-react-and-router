import { ADD_DESCRIPTION, REMOVE_DESCRIPTION, GET_LIST, } from './types';
import {postApi} from './api'
import { sendingData, sendingError } from '../../../redux/actions/apis';
import { API_SUCCESS } from '../../../redux/actions/actionsType';

export const listAdd = (description) => {
    return { type: ADD_DESCRIPTION, description };
}

export const listRemove = (row) => {
    return { type: REMOVE_DESCRIPTION, row };
}

export const getList = (rows) => {
    return { type: GET_LIST, rows };
}

export const loadList = () => (dispatch) => {
    dispatch(sendingData());

    console.log('loading...');

    return postApi()
        .then((response) => {
            dispatch({type: API_SUCCESS});

            const rows = response.data.map( (i) => ({uuid:i.id, description: i.body}) );

            dispatch({type: GET_LIST, rows });
        })
        .catch((error) => {
            dispatch(sendingError());

            return error;
        });
    };
;
