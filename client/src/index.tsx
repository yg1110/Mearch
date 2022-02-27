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
import Loader from './Pages/Loader'

const ThemeMode = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.secondary};
    width: 100vw;
    height: 100vh;
  `}
`

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

const Providers: FC = ({ children }) => {
  const theme = useSelector((state:StateType) => state.theme)
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === LIGHT ? lightTheme : darkTheme}>
        <GlobalTheme />
        <ThemeMode>
          <React.Suspense fallback={
            <Loader
              type='cylon'
              color={theme === LIGHT ? 'black' : 'white'}
            />
          }
          >
            <RootContainer>
              {children}
            </RootContainer>
          </React.Suspense>
        </ThemeMode>
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
