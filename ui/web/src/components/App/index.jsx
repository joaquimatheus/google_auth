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
import Welcome from '../../pages/Welcome';
import ForgetPassword from '../../pages/ForgetPassword';
import RecoverPassword from '../../pages/RecoverPassword';
import Chat from "../../pages/Chat";
import SetAvatar from "../../pages/SetAvatar"

import ThemePicker from "../ThemePicker";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    const localThemes = getFromLocalStorage("all-themes");

    if (!localThemes) {
        setToLocalStorage("all-themes", defaultThemes);
    }

    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);

    useEffect(() => {
        setSelectedTheme(theme);
    }, [theme, themeLoaded]);

    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
        <>
            {themeLoaded && (
                <GoogleOAuthProvider clientId={CLIENT_ID}>
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
                                <Route path="/forget-password" element={ <ForgetPassword />} />
                                <Route path="/recover-password" element={ <RecoverPassword /> }/>
                                <Route path="/signin" element={<Login />} />
                                <Route path="/signup" element={ <Register /> }/>
                                <Route path="/welcome" element={ <Welcome /> }/>
                                <Route path="/chat" element={ <Chat chatAnimationDelay={600} /> }/>
                                <Route path="/avatar" element={ <SetAvatar /> }/>
                            </Routes>
                        </StyledApp>
                    </ThemeProvider>
                </GoogleOAuthProvider>
            )}
        </>
    );
}

export default App;
