"use client"
import {createContext, useContext, useState} from 'react'

const preferencesContext = createContext()

const initialState = {
    grid: true
}

export function PreferencesProvider({children}){
    const [preferences, setPreferences] = useState(initialState)
    return (
        <preferencesContext.Provider
            value={{preferences, setPreferences}}
        >
            {children}
        </preferencesContext.Provider>
    )
}

export const usePreferences = () => useContext(preferencesContext)