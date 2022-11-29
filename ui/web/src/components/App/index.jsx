import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../../themes/globalStyles'
import { StyledApp, Nav } from './styles'

import { getFromLocalStorage, setToLocalStorage } from '../../helpers/storage'
import { defaultThemes } from '../../themes/themes'
import { useTheme } from '../../themes/useTheme'

import Login from '../../pages/Login'

import ThemePicker from '../ThemePicker'

function App() {
    const localThemes = getFromLocalStorage("all-themes")
    
    if (!localThemes) {
        setToLocalStorage("all-themes", defaultThemes)
    }

    console.log(defaultThemes)

    const { theme, themeLoaded } = useTheme()
    const [selectedTheme, setSelectedTheme] = useState(theme)

    useEffect(() => {
        setSelectedTheme(theme)
    }, [theme, themeLoaded])
    
    console.log('selectedTheme', selectedTheme)

    return (
        <>
            {themeLoaded && (
                <ThemeProvider theme={selectedTheme} >
                    <GlobalStyles />
                    <StyledApp>
                        <header>
                            <Nav>
                                <ThemePicker themeSetter={setSelectedTheme} />
                            </Nav>
                        </header>
                        <Routes>
                            <Route path="/" element={ <Login /> }/>
                        </Routes>
                    </StyledApp>
                </ThemeProvider >
            )}
        </>
    )
}

export default App
