'use client'

import { createContext, useContext, useEffect, useState } from "react"

type DarkModeProps = {
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const DarkModeContext = createContext<DarkModeProps | undefined>(undefined)

export const useDarkMode = () => {
    const context = useContext(DarkModeContext)
    if(context === undefined){
        throw new Error('Failed to get context')
    }
    return context
}

export default function DarkModeProvider({children}: {children: React.ReactNode}) {
    const [darkMode, setDarkMode] = useState<boolean>(false)

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode')
        if(savedMode !== null){
            setDarkMode(JSON.parse(savedMode))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    return (
        <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}