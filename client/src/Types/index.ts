export interface ProductInfo {
    Date: Date,
    Image: string,
    Sale: string,
    Title: string,
    Price: number,
    SalePrice: number,
    Link: string,
    Colors: string[],
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
    filterColors?: string[]
}

export interface filterTagType {
  color:string[],
  category: string[]
}

export type StateType = {
    product: ProductInfoListType,
    theme: string
};

export type DataContextValues = {
    makeContentRef: React.MutableRefObject<HTMLDivElement>
    selectContentRef: React.MutableRefObject<HTMLDivElement>
    closeModal: () => void
    closeMakeModal : () => void
};

export interface ModalPropsType {
    isOpen: boolean,
    closeModal: () => void
}

export type ItmePropsType = {
    children: string
    filterCategorys: string[]
}

type ItemType = {
    changeFilterColors: (color:string) => void,
    changeFilterCategory: (category:string|null) => void,
    filterTags:filterTagType
}

export interface MenuPropsType {
    items: ItemType,
}

type ColorSet = string[]
export type ColorSetType = ColorSet[]

export type ColorSetPropsType = {
    colorSet:ColorSetType
}

export type CloSetPropsType = {
    setClothset: (top:string, bottom:string) => void
}

export interface ProductInfoListProps {
    infoList: ProductInfoListType
}

export interface ProductInfoPropsType {
  items: ProductInfoListType
}
