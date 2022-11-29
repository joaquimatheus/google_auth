import React, { createRef, useCallback, useEffect, useState } from 'react';
import { Picker, StyledThemePicker, Theme, ThemeColor} from './styles'

import { getFromLocalStorage } from '../../helpers/storage'

import { useTheme } from '../../themes/useTheme'

import { Icon } from '../Icon'

const ThemePicker = ({ themeSetter }) => {
    const [ isOpen, setIsOpen ] = useState(false)
    const { setActiveTheme } = useTheme()

    const localThemes = getFromLocalStorage("all-themes")
    const divRef = createRef()
    const activeTheme = getFromLocalStorage('active-theme')

    const menuCloseHandler = useCallback(
        (ev) => {
            if (!divRef.current) {return}

            if(isOpen && !divRef.current.contains(ev.target)) {
                setIsOpen()
            }
        },
        [divRef, isOpen]
    )

    console.log(themeSetter)
    console.log(isOpen)

    useEffect(() => {
        window.addEventListener('click', menuCloseHandler)
        return () => {
            window.removeEventListener('click', menuCloseHandler)
        }
    }, [menuCloseHandler])

    return (
        <StyledThemePicker ref={divRef}>
            <button onClick={() => setIsOpen((prev) => !prev)}>
                Change Theme
                <Icon src="chevron-down.svg" color="white" size="10px"/>
            </button>
            <Picker className={isOpen ? "visible" : "" }>
                <ul>
                    {Object.values(localThemes).map((theme) => {
                        return (
                            <Theme
                                key={theme.id}
                                className={theme.id === activeTheme.id ? 'active' : ""}
                                onClick={() => {
                                    setActiveTheme(theme)
                                    themeSetter(theme)
                                }}
                            >
                                <p>{theme.name}</p>
                                <ThemeColor themeColor={theme.colors.background.first}/>
                                <ThemeColor themeColor={theme.colors.background.second}/>
                                <ThemeColor themeColor={theme.colors.primary} />
                                <ThemeColor themeColor={theme.colors.secondary} />
                            </Theme>
                        )
                    })}
                </ul>
            </Picker>
        </StyledThemePicker>
    )
}

export default ThemePicker
