import styled, { createGlobalStyle, css } from 'styled-components'
import { ReactComponent as Top } from '../Assets/top.svg'
import { ReactComponent as Bottom } from '../Assets/bottom.svg'
import { ColorPoropsType, SVGType } from '../Types'

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
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 93%;
  width: 100%;
  max-width: 1300px;
  margin: auto;
`

export const TopSVG = styled(Top)`
  ${({ theme }) => css`
    height: ${(props:SVGType) => props.height};
    fill:${(props:SVGType) => {
    if (props.fill === theme.colors.primary || props.fill === '') { return theme.colors.secondary }
    return props.fill
  }};`}
`

export const BottomSVG = styled(Bottom)<SVGType>`
  ${({ theme }) => css`
    height: ${(props:SVGType) => props.height};
    fill:${(props:SVGType) => {
    if (props.fill === theme.colors.primary || props.fill === '') { return theme.colors.secondary }
    return props.fill
  }};`}
`

export const Color = styled.div`
  ${({ theme }) => css`
    display:inline-block;
    width:2rem;
    height:2rem;
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

    border: 1px solid ${(props:ColorPoropsType) => {
    if (props.color === '#ffffff') { return '#e8ebed' }
    if (props.color === '#000000') { return '#ffffff' }
    return props.color
  }};`}
`
