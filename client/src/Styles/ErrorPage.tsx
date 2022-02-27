import styled, { css } from 'styled-components'

export const ErrorPageContainer = styled.div`
    position: relative;
    height: 93%;
`

export const CenterSection = styled.section`
    position: absolute;
    left: 50%;
    top: 50%;
    max-width: 520px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
    transform: translate(-50%, -50%);
`

export const NotFoundContainer = styled.article`
    position: relative;
    height: 280px;
`

export const NotFoundTitle = styled.h3`
    ${({ theme }) => css`
        font-family: 'Cabin', sans-serif;
        position: relative;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        color: ${theme.colors.secondary};
        margin: 0px;
        letter-spacing: 3px;
        padding-left: 6px;
        line-height: 1.4;
    `}
`

export const NotFoundNumber = styled.h1`
    ${({ theme }) => css`
        font-family: 'Montserrat', sans-serif;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 252px;
        font-weight: 900;
        margin: 0px;
        color: ${theme.colors.secondary};
        text-transform: uppercase;
        letter-spacing: -40px;
        margin-left: -20px;
    `}
`

export const NotFoundNumberText = styled.span`
    ${({ theme }) => css`
        text-shadow: -8px 0px 0px ${theme.colors.forth};
    `}
`

export const NotFoundMessage = styled.h2`
    ${({ theme }) => css`
        font-family: 'Cabin', sans-serif;
        font-size: 20px;
        font-weight: 400;
        text-transform: uppercase;
        color: ${theme.colors.secondary};
        margin-top: 0px;
        margin-bottom: 25px;
    `}
`

export const HomeButton = styled.a`
    ${({ theme }) => css`
        font-family: 'Cabin', sans-serif;
        font-size: 14px;
        text-decoration: none;
        text-transform: uppercase;
        background: transparent;
        color: ${theme.colors.secondary};
        border: 2px solid ${theme.colors.secondary};
        display: inline-block;
        padding: 10px 25px;
        font-weight: 700;
        transition: 0.2s all;
        &:hover {
            cursor: pointer;
        }
    `}
`
