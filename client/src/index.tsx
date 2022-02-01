import React, { FC } from 'react'
import ReactDOM from 'react-dom'

import styled, { ThemeProvider, css } from 'styled-components'
import { useSelector, Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { darkTheme, lightTheme } from './Styles/theme'
import { GlobalTheme } from './Styles'
import { LIGHT } from './Constants/Color'
import { store } from './Middleware/Store'
import { StateType } from './Types'
import Routes from './Router'
import Header from './Components/Header'

const ThemeMode = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.secondary};
    width: 100vw;
    height: 100vh;
  `}
`

const Providers: FC = ({ children }) => {
  const theme = useSelector((state:StateType) => state.theme)
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === LIGHT ? lightTheme : darkTheme}>
        <GlobalTheme />
        <React.Suspense fallback={<p>loading...</p>}>
          <ThemeMode>
            {children}
          </ThemeMode>
        </React.Suspense>
      </ThemeProvider>
    </BrowserRouter>
  )
}

const App: FC = () => (
  <Provider store={store}>
    <Providers>
      <Header />
      <Routes />
    </Providers>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
