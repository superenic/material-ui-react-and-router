import { v4 as uuidv4 } from 'uuid';
import initialState from "../../../redux/initialState";
import {
    ADD_DESCRIPTION,
    REMOVE_DESCRIPTION,
    GET_LIST,
} from './types';

/**
 * 
 * @param {Array<{uuid:string, description:string}>} state 
 * @param {{uuid:string, description:string}} action 
 * @return {Array}
 */
export default function listReducer( state = initialState.list, action ) {
    switch (action.type) {
        case ADD_DESCRIPTION:
            return [...state, {uuid: uuidv4(), description: action.description}];
        case REMOVE_DESCRIPTION:
            return state.filter((item) => item.uuid !== action.row.uuid);
        case GET_LIST:
            return action.rows;
        default:
            return state;
    }    
};

