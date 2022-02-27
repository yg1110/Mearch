import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  ErrorPageContainer, CenterSection, NotFoundContainer, NotFoundTitle, NotFoundNumber, HomeButton, NotFoundNumberText, NotFoundMessage,
} from '../Styles/ErrorPage'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <ErrorPageContainer>
      <CenterSection>
        <NotFoundContainer>
          <NotFoundTitle>Oops! Page not found</NotFoundTitle>
          <NotFoundNumber>
            <NotFoundNumberText>4</NotFoundNumberText>
            <NotFoundNumberText>0</NotFoundNumberText>
            <NotFoundNumberText>4</NotFoundNumberText>
          </NotFoundNumber>
        </NotFoundContainer>
        <NotFoundMessage>we are sorry, but the page you requested was not found</NotFoundMessage>
        <HomeButton onClick={() => navigate('/')}>홈으로 이동</HomeButton>
      </CenterSection>
    </ErrorPageContainer>
  )
}

export default React.memo(ErrorPage)
