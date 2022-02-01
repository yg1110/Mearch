import styled, { css } from 'styled-components'

export const ClosetContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    height: 100%;

    ${theme.device.pc} {
      padding: 1.5rem 5rem;
    }

    ${theme.device.tablet} {
      padding: 1.5rem;
    }

    ${theme.device.mobile} {
      padding: 1.5rem;
    }
  `}
`

export const Cloth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
`

export const RadioButton = styled.input`
  margin:0.5rem;
  &:hover {
    cursor: pointer;
    color:black;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
`

export const Button = styled.div`
  ${({ theme }) => css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10rem;
      height: 3rem;
      padding: 1rem;
      background: ${theme.colors.fifth};
      border: 1px solid ${theme.colors.sixth};
      font-weight: bold;
      cursor: pointer;
  `}
`

export const ClosetColorSetting = styled.div`

  ${({ theme }) => css`
    display: flex;
    align-items: center;

    ${theme.device.pc} {
      margin: 3rem;
    }

    ${theme.device.tablet} {
      margin: 2rem;
    }

    ${theme.device.mobile} {
      margin: 1rem;
    }
  `}
`

export const Palette = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const SvgContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    height: 100%;
    ${theme.device.pc} {
      width: 10%;
    }

    ${theme.device.tablet} {
      width: 17%;
    }

    ${theme.device.mobile} {
      width: 25%;
    }
  `}
`