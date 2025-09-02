import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../lib/types/screen";



const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveProducts = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.products
);

export const retrieveMall = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.mall
);

export const retrieveChosenProduct = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.chosenProduct
);