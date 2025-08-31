import { Box, Container, Stack } from "@mui/material";
import { CardContent, CardCover, CssVarsProvider } from "@mui/joy";

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from "../../components/divider"
import Typography from '@mui/joy/Typography';
import VisiblityIcon from "@mui/icons-material/Visibility"
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useEffect, useState } from "react";



/** REDUX SELECTOR **/ 
const newProductsRetriever = createSelector(retrieveNewProducts,
    (newProducts) => ({newProducts})
);

export default function NewDishes() {
    const { newProducts } = useSelector(newProductsRetriever);
    const [hover, setHover] = useState<boolean>(false);
    useEffect(() => {
        console.log(1);
    },[hover])
    return (
        <div className="new-dishes-frame">
            <Container>
                <Stack className="new-dishes">
                    <Box className="category-title">New Fashions</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            { newProducts.length !== 0 ? (
                            newProducts.map((product: Product) => {
                                const imagePath = `${serverApi}/${product?.productImages[0]}`;
                                const imagePath1 = `${serverApi}/${product?.productImages[1]}`;
                                return (
                                    <Card key={product?._id} onMouseEnter={(e) => {setHover(!hover)}} className={"card"} sx={{ minHeight: '280px', width: 320, }}>
                                        <CardCover>
                                            <img
                                            src={hover === false ? imagePath : imagePath1}
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
                                );
                            })) : <Box className="no-data">New Product Are Not Available!</Box> }
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}