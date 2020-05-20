import React, {createContext, useReducer} from 'react'
import { drawerReducer } from '../../context/drawerReducer';

export const NavContext = createContext()
const NavBarContextProvider = ({ children }) => {
    const [_isOpenDrawer, drawerDispatch] = useReducer(drawerReducer, false)
    const provider = {
        isOpenDrawer: _isOpenDrawer,
        drawerDispatch,
    };

    return (
        <NavContext.Provider value={provider}>
            { children }
        </NavContext.Provider>
    )
}

export default NavBarContextProvider
