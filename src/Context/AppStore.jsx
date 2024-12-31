import React, { createContext, useState,  } from 'react'


export const AppStorage = createContext()


const AppStore = ({children}) => {
    let [active,setActive]=useState()

    let store = {active,setActive}

    return (
       <AppStorage.Provider value={store} >
       {children}
       </AppStorage.Provider>
    )
}

export default AppStore
