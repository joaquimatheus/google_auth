import { useEffect, useState } from 'react'
import { defaultThemes } from './themes'
import { getFromLocalStorage, setToLocalStorage } from '../helpers/storage'

export const useTheme = () => {
    const [theme, setTheme] = useState(defaultThemes.default)
    const [themeLoaded, setThemeLoaded] = useState(false)

    const setActiveTheme = (newTheme) => {
        setToLocalStorage('active-theme', newTheme)
        setTheme(newTheme)
    }

    useEffect(() => {
        const localTheme = getFromLocalStorage('active-theme')

        if (!localTheme) {
            setTheme(defaultThemes.default)
            setToLocalStorage("active-theme", defaultThemes.dark)
            setThemeLoaded(true)
            return
        }

        setTheme(localTheme)
        setThemeLoaded(true)
    }, [])

    return { theme, themeLoaded, setActiveTheme }
}
