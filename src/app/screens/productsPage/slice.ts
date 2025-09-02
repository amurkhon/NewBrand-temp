import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";




const initialState: ProductsPageState = {
    mall: null,
    products: [],
    chosenProduct: null,
};

const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setMall: (state, action) => {
            state.mall = action.payload;
        },
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    }
});

export const { setMall, setChosenProduct, setProducts} = productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;

export default ProductsPageReducer;