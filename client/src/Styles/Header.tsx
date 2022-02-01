import styled, { css } from 'styled-components'

export const Container = styled.header`
    ${({ theme }) => css`
        display: flex;
        width: 100%;
        z-index: 1000;
        height: 7%;
        justify-content: space-around;
        align-items: center;
        background: ${theme.colors.primary};
        border-bottom: 1px solid ${theme.colors.forth};
        ${theme.device.tablet} {
            padding: 0 1rem;
        }
    `}
`

export const Title = styled.h1`
    ${({ theme }) => css`
        font-size: 2rem;
        color:${theme.colors.secondary};
    `}
`

export const NavigationList = styled.nav`
    ${({ theme }) => css`
        ${theme.device.tablet} {
            visibility: collapse;
        }
    `}
`

export const NavigationItem = styled.li`
    ${({ theme }) => css`
        display: inline-block;
        padding: 0 1rem;
        font-size: 1.2rem;
        font-weight: bold;
        color: ${theme.colors.secondary};
        cursor: pointer;
        &:hover{
            color: ${theme.colors.royalblue};
        }
    `}
`

export const UtilsList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SvgButton = styled.button`
    ${({ theme }) => css`
        border: 0;
        width: 36px;
        height: 36px;
        border-radius: 18px;
        background-color: transparent;
        cursor: pointer;

        &:hover{
            background-color: ${theme.colors.tertiary};
        }
    `}
`

export const MobileButton = styled.button`
    ${({ theme }) => css`
        display: none;
        border: 0;
        width: 36px;
        height: 36px;
        border-radius: 18px;
        background-color: transparent;
        cursor: pointer;

        &:hover{
            background-color: ${theme.colors.tertiary};
        }

        ${theme.device.tablet} {
            display: inline-block;
        }
    `}
`

export const SildeMenuContent = styled.div`
    ${({ theme }) => css`
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
        overflow-y: hidden;
        width: 100%;
        height: 100%;
        transform: translateX(100%);
        transition: all .3s ease-out 0s;
        background-color: ${theme.colors.primary};
    `}
`

export const SildeHeader = styled.div`
        display: flex;
        padding: 1rem 3rem;
        justify-content: space-between;
`

export const SildeCloseButton = styled.div`
    ${({ theme }) => css`
        font-size: 2em;
        line-height: 72px;
        float: right;
        color:${theme.colors.secondary};
        cursor: pointer;
        &:hover{
            color: ${theme.colors.royalblue};
        }
    `}
`

export const SildeContent = styled.div`
    padding: 1rem 3rem;
`

export const SildeText = styled.h1`
    ${({ theme }) => css`
        font-size: 2em;
        line-height: 7rem;
        color:${theme.colors.secondary};
        cursor: pointer;
        &:hover{
            color: ${theme.colors.royalblue};
        }
    `}
`

export const SearchContent = styled.div`
    padding: 1rem 3rem;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const SearchMenuContent = styled.div`
    ${({ theme }) => css`
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3000;
        overflow-y: hidden;
        width: 100%;
        height: 100%;
        opacity: 0;
        transform: translateY(-100%);
        transition: all .3s ease-out 0s;
        background-color: ${theme.colors.primary};
    `}
`

export const SearchInput = styled.input`
    ${({ theme }) => css`
        display:block;
        width:80%;
        resize: none;
        overflow-y: hidden;
        border: 0;
        outline: 0;
        background: ${theme.colors.secondary};
        border-radius: 20px;
        padding:20px;
        font-weight: bold;
        font-size: 1.4em;
        color: ${theme.colors.primary};
        ${theme.device.mobile} {
            font-size: 1em;
            width:80%;
        }
    `}
`

export const SearchTag = styled.select`
    ${({ theme }) => css`
        border-radius: 20px;
        padding: 20px;
        justify-content: left;
        margin: 20px;
        color: ${theme.colors.primary};
        background: ${theme.colors.secondary};
        font-weight: bold;
        font-size: 1.2em;
        width: 10rem;
        ${theme.device.mobile} {
            font-size: 1em;
            width: auto;
        }
    `}
`

export const Button = styled.button`
    ${({ theme }) => css`
        display: block;
        width: 180px;
        height: 60px;
        margin: 1rem;
        border-radius: 60px;
        font-size: 18px;
        line-height: 60px;
        color: ${theme.colors.primary};
        background-color: ${theme.colors.secondary};
        text-align: center;
    `}
`
