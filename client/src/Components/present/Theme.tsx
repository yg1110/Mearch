import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as Dark } from '../../Assets/dark.svg'
import { ReactComponent as Light } from '../../Assets/light.svg'

import { LIGHT, DARK } from '../../Constants/Color'

const ThemeContents = styled.div`
    display: flex;
    width: 15%;
    height: 100%;
    justify-content: center;
`

const ThemeSwichButton = styled.div`
    ${({ theme }) => css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: 3rem;
      background: ${theme.colors.fifth} no-repeat 50%;
      border: 1px solid ${theme.colors.sixth};
      cursor: pointer;
    `}
`

type ItemType = {
    lightColor: string,
    darkColor:string,
    changeLightTheme: () => void,
    changeDarkTheme: () => void,
    themeButtonHover: (theme:string) => void,
    themeButtonLeave: () => void,
}
interface ThemePropsType {
    items: ItemType
}
const Menu:FC<ThemePropsType> = props => {
  const { lightColor,
    darkColor,
    changeLightTheme,
    changeDarkTheme,
    themeButtonHover,
    themeButtonLeave } = props.items

  return (
    <ThemeContents>
      <ThemeSwichButton>
        <Light
          onClick={() => changeLightTheme()}
          onMouseEnter={() => themeButtonHover(LIGHT)}
          onMouseLeave={() => themeButtonLeave()}
          fill={lightColor}
          width='2rem'
          height='2rem'
        />
      </ThemeSwichButton>
      <ThemeSwichButton>
        <Dark
          onClick={() => changeDarkTheme()}
          onMouseEnter={() => themeButtonHover(DARK)}
          onMouseLeave={() => themeButtonLeave()}
          fill={darkColor}
          width='2rem'
          height='2rem'
        />
      </ThemeSwichButton>
    </ThemeContents>
  )
}
export default React.memo(Menu)
