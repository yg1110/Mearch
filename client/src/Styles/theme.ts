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
  royalblue: '#3d6eda',
}

const size = {
  small: '415px',
  mobile: '480px',
  tablet: '768px',
  desktop: '1280px',
}

// 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
const device = {
  small: `@media only screen and (max-width: ${size.small})`,
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktop: `@media only screen and (max-width: ${size.desktop})`,
}

const lightThemeColors = {
  ...colors,
  primary: '#fff',
  secondary: '#333',
  tertiary: '#eee',
  forth: '#eee',
  fifth: '#f9fafc',
  sixth: '#dfe0e5',
}

const darkThemeColors = {
  ...colors,
  primary: '#000',
  secondary: '#fff',
  tertiary: '#222224',
  forth: '#333',
  fifth: '#222224',
  sixth: '#161e2e',
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
