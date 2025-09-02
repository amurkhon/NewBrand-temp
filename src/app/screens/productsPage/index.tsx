import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css"
import { CartItem } from "../../../lib/types/search";
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setMall, setProducts } from "./slice";
import { Member } from "../../../lib/types/member";
import { useDispatch } from "react-redux";

interface ProductsPageProps {
    onAdd: (item: CartItem) => void;
}

/* Redux Slice */

export default function ProductsPage() {
    const products = useRouteMatch();
    return (
        <div className={"products-page"}>
            <Switch>
                <Route path={`${products.path}/:productId`}>
                    <ChosenProduct />
                </Route>
                <Route path={`${products.path}`}>
                    <Products />
                </Route>
            </Switch>
        </div>
    )
}