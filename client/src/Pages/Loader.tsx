import React, { FC } from 'react'
import ReactLoading from 'react-loading'
import styled, { css } from 'styled-components'
import { LoaderPropsType } from '../Types'

const LoaderContainer = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${theme.colors.primary};
  `}
`

const Loader:FC<LoaderPropsType> = ({ type, color }:LoaderPropsType) => (
  <div>
    <LoaderContainer>
      <h2>데이터를 불러오고 있습니다.</h2>
      <ReactLoading
        type={type}
        color={color}
        height='80%'
        width='80%'
      />
    </LoaderContainer>
  </div>
)

export default Loader
