import React, { FC } from 'react'
import Providers from './Provideer'
import Routes from '../Router'

const App: FC = () => (
  <Providers>
    <Routes />
  </Providers>
)

export default App
