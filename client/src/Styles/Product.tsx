import styled, { css } from 'styled-components'
import { ColorPoropsType } from '../Types'

export const ProductContainer = styled.div`
  width: 100%;
  height: 85%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0 3rem 0;
`

export const Items = styled.div`
${({ theme }) => css`
  background-color: ${theme.colors.primary};
  color:${theme.colors.secondary};
  height: 23rem;
  padding: 1rem;
  transition: 0.2s ease-in-out;
`}
`

export const Card = styled.div`
${({ theme }) => css`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 15rem;
  color:${theme.colors.secondary};
  border-radius: 14px;
  background-color: ${theme.colors.fifth};
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  transition: box-shadow .1s ease,transform .1s ease,-webkit-box-shadow .1s ease,-webkit-transform .1s ease;

  &: hover {
    transform: translateY(-3px);
  }
`}
`

export const ImageContainer = styled.img`
width: 100%;
height: 12rem;

&:hover {
  cursor: pointer;
}
`

export const SaleContainer = styled.div`
${({ theme }) => css`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  font-size:1rem;
  padding: 0.3rem;
  border-radius: 0.3rem;
  background-color: ${theme.colors.chestnutrose};
  color: ${theme.colors.white};
`}
`

export const Info = styled.div`
position: relative;
width: 100%;
text-align: center;
padding: 1rem 1rem 0.5rem 1rem;
`

interface TitlePoropsType {
    title? : string
}
export const TitleContainer = styled.div`
${({ theme }) => css`
  width:100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${theme.colors.secondary};
  font-weight: bold;
  title: ${(props:TitlePoropsType) => props.title};
`}
`

export const PriceContainer = styled.span`
${({ theme }) => css`
  color:${theme.colors.wildwatermelon};
  font-size: 1.2rem;
  margin: 0 0.3rem;
`}
`

export const SalePriceContainer = styled.del`
${({ theme }) => css`
  font-size: 0.8rem;
  color:${theme.colors.dustygray};
`}
`

export const Palette = styled.div`
${({ theme }) => css`
  width: 100%;
  height: 3rem;
  border-top: solid 1px ${theme.colors.forth};
`}
`

export const Paint = styled.div`
${({ theme }) => css`
  display:inline-block;
  width:2rem;
  height:2rem;
  margin: 0.5rem;
  border: 1px solid ${theme.colors.secondary};
  border-radius:50%;
  background-color: ${(props:ColorPoropsType) => props.color};
  &:hover {
    cursor: pointer;
  }
`}
`
