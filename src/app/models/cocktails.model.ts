export interface ICocktail {
    strDrink: string;
    strInstructions: string;
    dateModified: string;
    strGlass: string;
}

export interface ICocktailResponse {
    drinks: ICocktail[];
}