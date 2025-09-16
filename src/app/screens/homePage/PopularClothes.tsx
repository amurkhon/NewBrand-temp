import { Box, Container, Stack } from "@mui/material";

import {CssVarsProvider} from "@mui/joy/styles"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import VisiblityIcon from "@mui/icons-material/Visibility"
import CardOverflow from '@mui/joy/CardOverflow';
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useState } from "react";
import { T } from "../../../lib/types/common";

/** REDUX SELECTOR **/ 
const popularProductsRetriever = createSelector(retrievePopularProducts,
    (popularProducts) => ({popularProducts})
);
export default function PopularClothes() {
    const {popularProducts} = useSelector(popularProductsRetriever);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    return <div className="popular-dishes-frame">
        <Container>
            <Stack className="popular-section">
                <Box className="category-title">Popular Clothes</Box>
                <Stack className="cards-frame">
                    { popularProducts?.length !== 0 ? (
                    popularProducts?.map(function (product: Product, index){
                        const imagePath = product?.productImages[0] ? `${serverApi}/${product?.productImages[0]}` : "";
                        const imagePath1 = product?.productImages[1] ? `${serverApi}/${product?.productImages[1]}` : imagePath;

                        const isHovered = hoveredId === product?._id;
                        const shownSrc = isHovered ? imagePath : imagePath1;
                        return (
                            <CssVarsProvider key={product?._id}>
                                <Card 
                                    className={`card${index}`}
                                    onMouseEnter={(e: T) => setHoveredId(product?._id ?? null)} 
                                    onMouseLeave={(e: T) => setHoveredId(null)}
                                >
                                        <CardCover>
                                            <img  src={shownSrc} alt=""/>
                                        </CardCover>
                                    <CardCover className={"card-cover"} />
                                    <CardContent sx={{ justifyContent: 'flex-end' }}>
                                        <Stack 
                                            flexDirection={"row"}
                                            justifyContent={"space-between"}
                                        >
                                            <Typography level="h2" fontSize="lg" mb="1" textColor="#f0e5e5ff">
                                                {product?.productName}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontWeight: "md",
                                                    color: "neutral.300",
                                                    alignItems: "center",
                                                    display: "flex"
                                                }}                                            
                                            >
                                                {product?.productViews}
                                                <VisiblityIcon sx={{fontSize: 25, marginLeft: "5px", color: "neutral.300"}} />
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <CardOverflow
                                        sx={{
                                            display: "flex",
                                            gap: 1.5,
                                            py: 1.5,
                                            px: "var(--Card-padding)",
                                            borderTop: "1px solid", 
                                            height: "60px"
                                        }}
                                    >
                                        <Typography
                                            textColor={"neutral.300"}
                                        >
                                            {product?.productDesc}
                                        </Typography>
                                    </CardOverflow>
                                </Card>
                            </CssVarsProvider>
                        );
                    })) : <Box className="no-data">Popular Products Are Not Available!</Box>}
                </Stack>
            </Stack>
        </Container>
    </div>;
}