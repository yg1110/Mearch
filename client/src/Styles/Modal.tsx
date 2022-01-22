import styled from 'styled-components'
import { ColorPoropsType } from '../Types'

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: -1;
    opacity: 0;
    transition: all 0.5s;
`

export const Window = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
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

// # region SelectClosetContect
export const Cloth = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem;
`

export const Closet = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    height: 30rem;
    overflow-y: auto;
    flex-wrap : wrap;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 1.5rem;
`

export const RadioButton = styled.input`
    margin:0.5rem;
    &:hover {
        cursor: pointer;
        color:black;
    }
`

export const SelectCloset = styled.div`
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
// # endregion SelectClosetContect

// # region MakeClosetContect
export const MakeCloset = styled(SelectCloset)`
    width: 30rem;
    height: 25rem;
    opacity: 0;
    z-index: -1;
`
export const ClosetColorSetting = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42%;
    width: 100%;
`

// 추후 통일
export const Color = styled.div`
    display:inline-block;
    width:2rem;
    height:2rem;
    margin: 0.5rem;
    border: 1px solid ${(props:ColorPoropsType) => (props.color === '#ffffff' ? '#e8ebed' : props.color)};
    border-radius:50%;
    background-color: ${(props:ColorPoropsType) => (props.color || 'white')};
    &:hover {
        cursor: pointer;
    }
`

export const Palette = styled.div`
    display:flex;
    flex-direction: column;
`

export const ColorSetting = styled.div`
    display: flex;
`

export const ButtonCenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
// # endregion MakeClosetContect
