import { Box, Container, Stack } from "@mui/material";
import { CardContent, CardCover, CssVarsProvider, Link } from "@mui/joy";

import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useEffect, useState } from "react";
import { T } from "../../../lib/types/common";



/** REDUX SELECTOR **/ 
const newProductsRetriever = createSelector(retrieveNewProducts,
    (newProducts) => ({newProducts})
);

export default function NewDishes() {
    const { newProducts } = useSelector(newProductsRetriever);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    return (
        <div className="new-dishes-frame">
            <Container>
                <Stack className="new-dishes">
                    <Box className="category-title">New Fashions</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            { newProducts.length !== 0 ? (
                            newProducts.map((product: Product) => {
                                const imagePath = product?.productImages[0] ? `${serverApi}/${product?.productImages[0]}` : "";
                                const imagePath1 = product?.productImages[1] ? `${serverApi}/${product?.productImages[1]}` : imagePath;

                                const isHovered = hoveredId === product?._id;
                                const shownSrc = isHovered ? imagePath : imagePath1;
                                return (
                                    <Link href={`/products/${product?._id}`}>
                                        <Card 
                                            key={product?._id} 
                                            onMouseEnter={(e: T) => setHoveredId(product?._id ?? null)} 
                                            onMouseLeave={(e: T) => setHoveredId(null)} 
                                            className={"card"} 
                                            sx={{ minHeight: '280px', width: 320, }}
                                        >
                                            <CardCover>
                                                <img
                                                src={shownSrc}
                                                loading="lazy"
                                                alt=""
                                                />
                                            </CardCover>
                                            <CardCover
                                                sx={{
                                                background:
                                                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                                                }}
                                            />
                                            <CardContent sx={{ justifyContent: 'flex-end' }}>
                                                <Typography level="title-lg" textColor="#fff">
                                                    {product?.productName}
                                                </Typography>
                                                <Typography
                                                    textColor="neutral.300"
                                                >
                                                    Only {product?.productLeftCount} left!
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })) : <Box className="no-data">New Product Are Not Available!</Box> }
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}