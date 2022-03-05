import styled, { css } from 'styled-components'
import { ColorPoropsType, ItmePropsType } from '../Types'

export const MenuContents = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin: auto;
    height: 15%;
    ${theme.device.tablet} {
      display: none;
    }
  `}
`

export const Category = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    color: ${theme.colors.royalblue};
    font-size: 1.5rem;
    width: 100px;
    font-weight: bold;
  `}
`

export const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`

export const Item = styled.span<ItmePropsType>`
  ${({ theme }) => css`
    margin: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    &::after{
      display:block;
      content: '';
      border-bottom: solid 2px ${theme.colors.royalblue};  
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
    &:hover:after{
      transform: scaleX(1);
    }
    &:hover{
      cursor: pointer;
    }
    color: ${(props:ItmePropsType) => {
    if (props.filterCategorys.length === 0) { return props.children === '전체' ? '#3d6eda' : 'rgb(183, 193, 204)' }
    return props.filterCategorys.includes(props.children) ? '#3d6eda' : 'rgb(183, 193, 204)'
  }};`}
`

export const Palette = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
`

export const CheckIcon = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0.5rem;
  display: ${((props:ColorPoropsType) => {
    if (props.filterColors) { return props.filterColors.includes(props.color) ? 'block' : 'none' }
    return 'none'
  })};
  color: ${((props:ColorPoropsType) => {
    const condition1 = props.color === '#ffffff'
    const condition2 = props.color === '#ffea00'
    const condition3 = props.color === '#ceef00'
    return (condition1 || condition2 || condition3) ? 'black' : 'white'
  })};
`

export const MenuItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 100px);
`

export const MobileMenuContainer = styled.div`
  ${({ theme }) => css`
    ${theme.device.pc} {
      display: none;
    }

    ${theme.device.tablet} {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 18px;
    }

    ${theme.device.mobile} {
      display: flex;
      width: 100%;
      margin-top: 18px;
    }
  `}
`
