import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "../../themes/globalStyles";
import { StyledApp, Nav } from "./styles";

import { getFromLocalStorage, setToLocalStorage } from "../../helpers/storage";
import { defaultThemes } from "../../themes/themes";
import { useTheme } from "../../themes/useTheme";

import Login from "../../pages/Login";
import Register from '../../pages/Register';

import ThemePicker from "../ThemePicker";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    const localThemes = getFromLocalStorage("all-themes");

    if (!localThemes) {
        setToLocalStorage("all-themes", defaultThemes);
    }

    console.log(defaultThemes);

    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);

    useEffect(() => {
        setSelectedTheme(theme);
    }, [theme, themeLoaded]);

    console.log("selectedTheme", selectedTheme);

    return (
        <>
            {themeLoaded && (
                <GoogleOAuthProvider clientId="970275515164-i13mjqsbta13hg9paobo7bnt51ov4h32.apps.googleusercontent.com">
                    <ThemeProvider theme={selectedTheme}>
                        <GlobalStyles />
                        <StyledApp>
                            <header>
                                <Nav>
                                    <ThemePicker
                                        themeSetter={setSelectedTheme}
                                    />
                                </Nav>
                            </header>
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/signup" element={ <Register /> }/>
                            </Routes>
                        </StyledApp>
                    </ThemeProvider>
                </GoogleOAuthProvider>
            )}
        </>
    );
}

export default App;
