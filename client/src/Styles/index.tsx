import styled, { createGlobalStyle, css } from 'styled-components'

export const GlobalTheme = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
    }
`

type ButtonType = {
    width: string
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

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`
