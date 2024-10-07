'use client'
import { createContext } from "react"
const DataContext = createContext([])

const Provider = ({children, messages}) => {
    return (
        <DataContext.Provider value={messages} >
            {children}
        </DataContext.Provider>
    )
}


export {DataContext, Provider}