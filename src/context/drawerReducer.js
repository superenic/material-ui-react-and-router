import * as actions from './actions';

export const drawerReducer = (state = false, action) => {
    switch(action.type)
    {
        case actions.CLOSE_DRAWER:
            return false;
        case actions.OPEN_DRAWER:
            return true;
        case actions.TOGGLE_DRAWER:
                return ! state.openDrawer;
        default: return state;
    }
}