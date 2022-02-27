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

export type ButtonType = {
    width: string
}

export interface TitlePoropsType {
    title? : string
}

export type SVGType = {
    fill: string,
    height: string
}

export type ProductListType = ProductInfo[]

export interface ColorPoropsType {
    color : string
    filterColors?: string[]
}

export interface filterTagType {
  color:string[],
  category: string[]
}

export type StateType = {
    product: ProductListType,
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
    onCheckedCloth: (index:number) => void
}

export type CloSetPropsType = {
    setClothset: (top:string, bottom:string) => void
}

export interface ProductListProps {
    infoList: ProductListType
}

export interface ProductPropsType {
  items: ProductListType
}

export type MakeClothType = {
    topFillColor: string,
    bottomFillColor: string,
    onChangeTopClothColor: (color:string) => void,
    onChangeBottomClothColor: (color:string) => void
}

export type MakeClothPropsType = {
    items: MakeClothType
}

export type MultiCheckComboBox = {
    checked: boolean,
    name: string,
}

type LoadingType = 'blank' | 'balls' | 'bars' | 'bubbles' | 'cubes' | 'cylon' | 'spin' | 'spinningBubbles' | 'spokes';
export interface LoaderPropsType {
    type: LoadingType,
    color: string
}
