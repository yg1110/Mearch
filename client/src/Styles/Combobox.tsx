import styled, { css } from 'styled-components'

export const MultiComboBoxContainer = styled.div`
    width: 200px;
    position: relative;
    margin-left: 3rem;
`

export const SelectBox = styled.button`
  ${({ theme }) => css`
    display: block;
    position: relative;
    color:  ${theme.colors.secondary};
    padding: 1rem;
    border-radius: 30px;
    border:transparent;
    background-color: ${theme.colors.forth};
    & select{
        width: 100%;
        background-color: transparent;
        border: transparent;
        font-weight: bold;
        font-weight: 700;
        font-size: 16px;
        color:  ${theme.colors.secondary};
    }
  `}
`

export const OverSelect = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  
`

export const Checkboxes = styled.div`
    ${({ theme }) => css`
        display: none;
        position: absolute;
        z-index: 2000;
        border: 1px #dadada solid;
        width: 80%;
        max-height: 19rem;
        overflow-y: auto;
        padding: 10px 0;
        border-radius: 12px;
        background-color: ${theme.colors.forth};
        margin: 20px 0 0 0;
        & label {
            display: flex;
            align-items: center;
            padding: 0.5rem;
        }
        & label h3{
            display: inline-block;
            color: ${theme.colors.secondary};
        }
        & label:hover{
            background-color: ${theme.colors.royalblue};
        }
    `}
`

export const CheckBoxLabel = styled.h3`
    text-align: center;
    width: 100%;
`

export const Palette = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2rem;
`
