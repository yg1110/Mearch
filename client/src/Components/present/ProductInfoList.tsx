import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'
import { ProductInfoListType } from '../../Types/productInfoType'
import { productState } from '../../Reducer'

export interface ProductInfoListProps {
    infoList: ProductInfoListType
}
const UL = styled.ul`
  ${() => css`
    list-style:none;
    width: 100%;
    height: 100%;
  `}
`
const LI = styled.li`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    background-color: ${theme.colors.primary};
    color:${theme.colors.secondary};
    float: left;
    width: 20%;
    padding: 10px;
  `}
`

const IMG = styled.img`
    ${() => css`
        width:125px;
        height:150px;
    `}
`

const TITLE = styled.div`
    ${() => css`
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `}
`

const ProductInfoList:FC = () => {
  const product = useSelector((state:productState) => state.product)
  return (
    <UL>
      {product.map(({ Date, Image, Price, Sale, SalePrice, Title, _id }) => (
        <LI key={_id}>
          <IMG
            src={Image}
            alt={Title}
          />
          <div>{Sale}</div>
          <TITLE>{Title}</TITLE>
          <div>{Date}</div>
          <div>{Price}</div>
          <div>{SalePrice}</div>
        </LI>
      ))}
    </UL>
  )
}

export default ProductInfoList
