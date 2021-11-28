import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from '../Store'
import Providers from './Provider'
import Routes from '../Router'

const App: FC = () => (
  <Provider store={store}>
    <Providers>
      <Routes />
    </Providers>
  </Provider>
)

export default React.memo(App)
