import React, { FC } from 'react'

import { useSelector } from 'react-redux'
import styled, { ThemeProvider, css } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { darkTheme, lightTheme } from '../Styles/theme'
import GlobalStyle from '../Styles/GlobalStyle'
import { StateType } from '../Reducer'
import { LIGHT } from '../Constants/Color'

const ThemeMode = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.secondary};
    width: 100%;
    height: 100%;
    min-width: 100vw;
    min-height: 100vh;
  `}
`

const Providers: FC = ({ children }) => {
  const theme = useSelector((state:StateType) => state.theme)

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === LIGHT ? lightTheme : darkTheme}>
        <GlobalStyle />
        <React.Suspense fallback={<p>loading...</p>}>
          <ThemeMode>
            {children}
          </ThemeMode>
        </React.Suspense>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Providers
