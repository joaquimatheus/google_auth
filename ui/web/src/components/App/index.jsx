import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { GlobalStyles } from './globalStyles'
import { StyledApp } from './styles'

import Login from '../../pages/Login'

function App() {
    return (
        <>
            <StyledApp>
            <GlobalStyles />
                <Routes>
                    <Route path="/" element={ <Login /> }/>
                </Routes>
            </StyledApp>
        </>
    )
}

export default App
