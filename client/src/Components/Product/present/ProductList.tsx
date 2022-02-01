import React, { FC } from 'react'
import {
  Card, ImageContainer, Info,
  Items, TitleContainer, SalePriceContainer,
  PriceContainer, SaleContainer, Paint, Palette,
} from '../../../Styles/Product'
import { ProductPropsType } from '../../../Types'

const ProductList:FC<ProductPropsType> = props => {
  const product = props.items
  const open = (link:string) => {
    window.open(link, '_blank')
  }

  return (
    <React.Fragment>
      {product.map(({ Image, Price, Sale, SalePrice, Title, Colors, Type, Link, _id }) => (
        <Items key={_id}>
          <Card>
            <ImageContainer
              src={Image}
              alt={Title}
              onClick={() => open(Link)}
            />
            { Sale !== '' && <SaleContainer>{Sale}</SaleContainer>}
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
    </React.Fragment>
  )
}

export default React.memo(ProductList)
