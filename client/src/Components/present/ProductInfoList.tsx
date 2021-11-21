import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'

import { ProductInfoListType } from '../../Types/productInfoType'
import { productState } from '../../Reducer'
import { ConvertRGBtoHex } from '../../Utils/ColorConverter'

export interface ProductInfoListProps {
    infoList: ProductInfoListType
}

const UL = styled.ul`
  list-style:none;
  text-align: center;
  width: 100%;
  height: 100%;
`

const Photo = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  text-align: center;
`

const Img = styled.img`
  position: absolute;
  width: 125px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: .5s;
  &:hover {
    width: 180px;
    height: 200px;
  }

  &:hover {
    cursor: pointer;
  }
`

const Content = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
`

const Titles = styled.div`
  width:100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const LI = styled.li`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.colors.primary};
    color:${theme.colors.secondary};
    float: left;
    width: 16.666%;
    height: 25rem;
    padding: 1rem;
    transition: 0.2s ease-in-out;
  `}
`

interface ColorPoropsType {
  color? : string
}

const Paint = styled.div`
  width:100%;
  height:40px;
`

const Palette = styled.div`
  display:inline-block;
  width:30px;
  height:30px;
  margin: 0.5rem;
  border-radius:50%;
  background-color: ${(props:ColorPoropsType) => props.color || 'white'};
  transition: .5s;
  &:hover {
    width: 33px;
    height: 33px;
  }

  &:hover {
    cursor: pointer;
  }
`

const ProductInfoList:FC = () => {
  const product = useSelector((state:productState) => state.product)

  return (
    <UL>
      {product.map(({ Date, Image, Price, Sale, SalePrice, Title, Colors, _id }) => (
        <LI key={_id}>
          <Photo>
            <Img
              className='image'
              src={Image}
              alt={Title}
            />
          </Photo>
          <Content>
            <div>{Sale}</div>
            <Titles>{Title}</Titles>
            <div>{Date}</div>
            <div>{Price}</div>
            <div>{SalePrice}</div>
            <Paint>
              {Colors.map(rgb => {
                const hex = ConvertRGBtoHex(rgb.R, rgb.G, rgb.B)
                return <Palette color={hex} />
              })}
            </Paint>
          </Content>
        </LI>
      ))}
    </UL>
  )
}

export default ProductInfoList
