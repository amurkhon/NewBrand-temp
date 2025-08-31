import Events from "./Events";
import "../../../css/home.css";
import PopularClothes from "./PopularClothes";
import NewClothes from "./NewClothes";
import Statistics from "./Statistics";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setPopularProducts, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import { useCallback, useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";


/* Redux Slice*/

const actionDispatch = (dispatch: Dispatch) =>({
    setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
    setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
    setTopUsers: (data: Product[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
    const { setPopularProducts, setNewProducts, setTopUsers } = actionDispatch(useDispatch());

    useEffect(() => {
        // Backend server data fetching => Data
        const product = new ProductService();

        product
            .getProducts({
                page:1,
                limit:4,
                order: "productViews",
            })
            .then((data) => setPopularProducts(data))
            .catch((err) => console.log(err));
    }, []);

    /* Handlers */
    return (
        <div className={"homepage"}>
            <Statistics />
            <PopularClothes />
            <NewClothes />
            <Advertisement />
            <ActiveUsers />
            <Events />
        </div>
    );
}