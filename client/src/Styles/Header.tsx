import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`

type ModalElementType = {
    name: string
}
export const SelectCloset = styled.div<ModalElementType>`
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #fff;
    box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
    padding: 1rem;
    border-radius: 1rem;
    width: 40rem;
    height: 37rem;
    transform: translate(-50%, -40%);
    transition: all 0.5s;
  `

export const Close = styled.span`
    position: fixed;
    top: 0.5rem;
    right: 1rem;
    font-size: 2rem;
    font-weight: bold;
    &:hover {
      cursor: pointer;
      color:black;
    }
  `

type ButtonPropsType = {
    width: string
  }
export const Button = styled.div<ButtonPropsType>`
    ${({ theme }) => css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${(props:ButtonPropsType) => props.width};
      height: 3rem;
      padding: 1rem;
      background: ${theme.colors.fifth} no-repeat 50%;
      border: 1px solid ${theme.colors.sixth};
      font-weight: bold;
      cursor: pointer;
    `}
  `
