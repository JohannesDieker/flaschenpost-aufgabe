export interface Product {
    id: number;
    brandName: string;
    name: string;
    articles: Article[];
}

export interface Article {
    id: number;
    shortDescription: string;
    price: number;
    unit: string;
    pricePerUnitText: string;
    image: string;
}


export interface renderedProduct {
    name: string;
    shortDescription: string;
    pricePerUnitText: string;
    price: number;
    image: string;
}