import React, {createContext, useState} from 'react'

export const NavContext = createContext()
const NavBarContextProvider = ({ children }) => {
    const [_isOpenDrawer, _setOpenDrawer] = useState(false);
    const openDrawer = () => { _setOpenDrawer(true); };
    const closeDrawer = () => { _setOpenDrawer(false); };
    const isOpenDrawer = () => _isOpenDrawer;
    const toggleDrawer = () => { _setOpenDrawer(! isOpenDrawer()); };
    const provider = {
        openDrawer,
        closeDrawer,
        isOpenDrawer,
        toggleDrawer,
    };

    return (
        <NavContext.Provider value={provider}>
            { children }
        </NavContext.Provider>
    )
}

export default NavBarContextProvider
