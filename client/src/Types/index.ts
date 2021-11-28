export interface ProductInfo {
    Date: Date,
    Image: string,
    Sale: string,
    Title: string,
    Price: number,
    SalePrice: number,
    Link: string,
    Colors: string[],
    ColorsCondition: number[],
    Type: string,
    __v: number,
    _id: string
}

export interface ThemeType {
    Theme:string
}

export type ProductInfoListType = ProductInfo[]

export interface ColorPoropsType {
    color : string
}
