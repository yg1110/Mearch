import React, { FC } from 'react'
import {
  Card, ImageContainer, Info, Container,
  Items, TitleContainer, SalePriceContainer,
  PriceContainer, SaleContainer, Paint, Palette,
} from '../../Styles/ProductInfo'
import { ProductInfoPropsType } from '../../Types'

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
    </Container>
  )
}

export default React.memo(ProductInfoList)
