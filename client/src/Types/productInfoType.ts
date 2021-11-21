export interface RGBType {
  R: number;
  G: number;
  B: number;
}

export interface ProductInfo {
    Date: Date,
    Image: string,
    Sale: string,
    Title: string,
    Price: number,
    SalePrice: number,
    Colors: RGBType[],
    __v: number,
    _id: string
}

export type ProductInfoListType = ProductInfo[]
