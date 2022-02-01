import styled, { createGlobalStyle, css } from 'styled-components'
import { ReactComponent as Top } from '../Assets/top.svg'
import { ReactComponent as Bottom } from '../Assets/bottom.svg'
import { ColorPoropsType } from '../Types'

export const GlobalTheme = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
    }
    ul {
        list-style: none;
    }
`

type ButtonType = {
    width: string
}

type SVGType = {
    fill: string
}
export const Button = styled.div<ButtonType>`
    ${({ theme }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${(props:ButtonType) => props.width};
        height: 3rem;
        padding: 1rem;
        background: ${theme.colors.fifth} no-repeat 50%;
        border: 1px solid ${theme.colors.sixth};
        font-weight: bold;
        cursor: pointer;
    `}
`

export const PageTitle = styled.h2`
    ${({ theme }) => css`
        margin: 2rem 0 0 2rem;
        font-size: 2rem;
        color:${theme.colors.secondary};
    `}
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 93%;
  width: 100%;
`

export const TopSVG = styled(Top)`
  ${({ theme }) => css`
    fill:${(props:SVGType) => {
    if (props.fill === theme.colors.primary || props.fill === '') {
      return theme.colors.secondary
    }
    return props.fill
  }
};`}
`

export const BottomSVG = styled(Bottom)<SVGType>`
  ${({ theme }) => css`
    fill:${(props:SVGType) => {
    if (props.fill === theme.colors.primary || props.fill === '') {
      return theme.colors.secondary
    }
    return props.fill
  }
};`}
`

export const Color = styled.div`
  ${({ theme }) => css`
    display:inline-block;
    width:2rem;
    height:2rem;
    border: 1px solid ${(props:ColorPoropsType) => {
    if (props.color === '#ffffff') {
      return '#e8ebed'
    }
    if (props.color === '#000000') {
      return '#ffffff'
    }

    return props.color
  }};
    border-radius:50%;
    background-color: ${(props:ColorPoropsType) => (props.color || 'white')};
    &:hover {
        cursor: pointer;
    }

    ${theme.device.pc} {
      margin: 1rem;
    }

    ${theme.device.tablet} {
      margin: 0.7rem;
    }

    ${theme.device.mobile} {
      margin: 0.5rem;
    }
  `}
`
