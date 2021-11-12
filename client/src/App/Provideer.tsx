import React, { useState, FC } from 'react'
import styled, { ThemeProvider, css } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { darkTheme, lightTheme } from '../Styles/theme'
import GlobalStyle from '../Styles/GlobalStyle'

const ThemeMode = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.secondary};
    width: 100vw;
    height: 100vh;
  `}
`

const ThemeSwitchBtn = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.size.base};
    border: 0px;
    border-radius: 2px;
  `}
`

const Providers: FC = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme)
  const [currentThemeText, setCurrentThemeText] = useState('Dark Theme')

  const switchTheme = () => {
    const nextTheme = theme === lightTheme ? darkTheme : lightTheme
    setTheme(nextTheme)
    const nextThemeText = theme === lightTheme ? 'Dark Theme' : 'Light Theme'
    setCurrentThemeText(nextThemeText)
  }
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <React.Suspense fallback={<p>loading...</p>}>
          <ThemeMode>
            <ThemeSwitchBtn onClick={switchTheme}>
              {currentThemeText}
            </ThemeSwitchBtn>
            {children}
          </ThemeMode>
        </React.Suspense>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Providers
