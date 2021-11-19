import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'

import Color, { Palette } from 'color-thief-react'
import { ProductInfoListType } from '../../Types/productInfoType'
import { productState } from '../../Reducer'

export interface ProductInfoListProps {
    infoList: ProductInfoListType
}
const UL = styled.ul`
  ${() => css`
    list-style:none;
    text-align: center;
    width: 100%;
    height: 100%;
  `}
`

const Photo = styled.div`
  ${() => css`
    position: relative;
    width: 100%;
    height: 200px;
    text-align: center;
  `}
`

const Img = styled.img`
  ${() => css`
    position: absolute;
    width: 125px;
    height: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: .5s;
  `}
`

const Content = styled.div`
  ${() => css`
    position: relative;
    width: 100%;
    text-align: center;
  `}
`

const Titles = styled.div`
  ${() => css`
      width:100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  `}
`

const LI = styled.li`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.colors.primary};
    color:${theme.colors.secondary};
    float: left;
    width: 16.666%;
    height: 30rem;
    padding: 1rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    /* &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: tomato;
      clip-path: circle(100px at 80% 10%);
      transition: .5s ease-in-out;
    }

    &:hover:before {
      clip-path: circle(200px at 80% -20%);
    } */

    &:hover ${Img} {
      width: 180px;
      height: 200px;
    }

    &:hover ${Content} {
      cursor: pointer;
    }
  `}
`

type ColorPoropsType = {
  color?: string
}
const ColorPick = styled.div`
  ${() => css`
      display:inline-block;
      width:30px;
      height:30px;
      margin: 0.5rem;
      border-radius:50%;
      background-color: ${(props:ColorPoropsType) => props.color || 'white'};;
  `}
`

const ProductInfoList:FC = () => {
  const product = useSelector((state:productState) => state.product)

  return (
    <UL>
      {product.map(({ Date, Image, Price, Sale, SalePrice, Title, _id }) => (
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
            <Color
              src={Image}
              crossOrigin='anonymous'
              format='hex'
            >
              {({ data }) => (
                <ColorPick
                  color={data}
                />
              )}
            </Color>
            <Palette
              src={Image}
              crossOrigin='anonymous'
              format='hex'
              colorCount={10}
            >
              {({ data }) => (
                <div>
                  {data !== undefined && data.map((color, index) => (
                    <ColorPick
                      key={index}
                      color={color}
                    />
                  ))}
                </div>
              )}
            </Palette>
          </Content>
        </LI>
      ))}
    </UL>
  )
}

export default ProductInfoList

/* <Color
        src='https://image.msscdn.net/images/goods_img/20210324/1862314/1862314_1_500.jpg'
        crossOrigin='anonymous'
        format='hex'
      >
        {({ data, loading }) => (
          <div>
            Predominant color:
            {' '}
            <strong>{data}</strong>
          </div>
        )}
      </Color>
      <Palette
        src='https://image.msscdn.net/images/goods_img/20210324/1862314/1862314_1_500.jpg'
        crossOrigin='anonymous'
        format='hex'
        colorCount={10}
      >
        {({ data, loading }) => (
          <div>
            Palette:
            <ul>
              {data !== undefined && data.map((color, index) => (
                <li
                  key={index}
                  style={{ color }}
                >
                  <strong>{color}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Palette> */
