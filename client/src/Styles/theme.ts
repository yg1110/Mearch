const margins = {
  sm: '.5rem',
  base: '1rem',
  lg: '2rem',
  xl: '3rem',
}

const paddings = {
  sm: '.5rem',
  base: '1rem',
  lg: '2rem',
  xl: '3rem',
}

const fonts = {
  family: {
    base: "'Noto Sans KR', sans-serif",
    title: "'Merriweather', serif",
  },
  size: {
    sm: '1.4rem',
    base: '1.6rem',
    lg: '2rem',
    xl: '2.5rem',
    title: '6rem',
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
}

const colors = {
  chestnutrose: '#c44e63',
  white: '#fff',
  wildwatermelon: '#FF5374',
  dustygray: '#999',
}

const size = {
  mobile: '425px',
  tablet: '768px',
  desktop: '1440px',
}

// 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`,
}

const lightThemeColors = {
  ...colors,
  primary: 'rgba(246, 246, 246, 0.5)',
  secondary: 'rgb(70, 77, 82)',
  tertiary: '#d4d0c4',
  forth: 'rgba(70, 77, 82, 0.082)',
}

const darkThemeColors = {
  ...colors,
  primary: 'rgb(16, 20, 33)',
  secondary: 'rgb(183, 193, 204)',
  tertiary: '#fff',
  forth: 'rgba(207, 207, 207, 0.25)',
}

// 테마와 관련없이 공통으로 사용되는 변수들입니다
const defalutTheme = {
  margins,
  paddings,
  fonts,
  device,
}

// 각 테마는 공통 변수와 함께, 각기 다른 색상 값들을 갖습니다.
export const darkTheme = {
  ...defalutTheme,
  colors: darkThemeColors,
}

export const lightTheme = {
  ...defalutTheme,
  colors: lightThemeColors,
}
