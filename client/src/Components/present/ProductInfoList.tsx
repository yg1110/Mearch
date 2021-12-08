import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import { ProductInfoListType, ColorPoropsType } from '../../Types'

export interface ProductInfoListProps {
    infoList: ProductInfoListType
}

const Container = styled.ul`
  list-style:none;
  text-align: center;
  width: 100%;
  height: 100%;
`

const Items = styled.li`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.colors.primary};
    color:${theme.colors.secondary};
    float: left;
    width: 16.666%;
    height: 23rem;
    padding: 1rem;
    transition: 0.2s ease-in-out;
  `}
`

const Card = styled.div`
  ${({ theme }) => css`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 15rem;
    padding: 0;
    color:${theme.colors.secondary};
    border-radius: 0.3rem;
    background-color: ${theme.colors.primary};
    box-shadow: 0 1px 3px 0 ${theme.colors.forth}, 0 0 0 1px ${theme.colors.forth};
    transition: box-shadow .1s ease,transform .1s ease,-webkit-box-shadow .1s ease,-webkit-transform .1s ease;

    &: hover {
      transform: translateY(-3px);
    }
  `}
`

const ImageContainer = styled.img`
  width: 100%;
  height: 12rem;

  &:hover {
    cursor: pointer;
  }
`

const SaleContainer = styled.div`
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

const Info = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  padding: 1rem 1rem 0.5rem 1rem;
`

interface TitlePoropsType {
  title? : string
}
const TitleContainer = styled.div`
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

const PriceContainer = styled.span`
  ${({ theme }) => css`
    color:${theme.colors.wildwatermelon};
    font-size: 1.2rem;
    margin: 0 0.3rem;
  `}
`

const SalePriceContainer = styled.del`
  ${({ theme }) => css`
    font-size: 0.8rem;
    color:${theme.colors.dustygray};
  `}
`

const Palette = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 3rem;
    border-top: solid 1px ${theme.colors.forth};
  `}
`

const Paint = styled.div`
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

interface ProductInfoPropsType {
  items: ProductInfoListType
}
const ProductInfoList:FC<ProductInfoPropsType> = props => {
  const open = (link:string) => {
    window.open(link, '_blank')
  }

  const product = props.items
  return (
    <Container>
      {product.map(({ Image, Price, Sale, SalePrice, Title, Colors, Type, Link, _id }) => (
        <Items key={_id}>
          <Card>
            <ImageContainer
              src={Image}
              alt={Title}
              onClick={() => open(Link)}
            />
            <SaleContainer>{Sale}</SaleContainer>
            <Info>
              <TitleContainer title={Title}>{Title}</TitleContainer>
              {Type}
              <div>
                {SalePrice !== 0 && <SalePriceContainer>{SalePrice}</SalePriceContainer>}
                <PriceContainer>{Price}</PriceContainer>
              </div>
              <Palette>
                {Colors.map((hex:string, key:number) => (
                  <Paint
                    key={hex + key}
                    color={hex}
                  />
                ))}
              </Palette>
            </Info>
          </Card>
        </Items>
      ))}
    </Container>
  )
}

export default React.memo(ProductInfoList)
