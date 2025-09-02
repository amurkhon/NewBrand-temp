import { Box, Container, Stack } from "@mui/material";

import {CssVarsProvider} from "@mui/joy/styles"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import VisiblityIcon from "@mui/icons-material/Visibility"
import CardOverflow from '@mui/joy/CardOverflow';
import { DescriptionOutlined } from "@mui/icons-material";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/** REDUX SELECTOR **/ 
const popularProductsRetriever = createSelector(retrievePopularProducts,
    (popularProducts) => ({popularProducts})
);
export default function PopularClothes() {
    const {popularProducts} = useSelector(popularProductsRetriever);
    return <div className="popular-dishes-frame">
        <Container>
            <Stack className="popular-section">
                <Box className="category-title">Popular Clothes</Box>
                <Stack className="cards-frame">
                    { popularProducts?.length !== 0 ? (
                    popularProducts?.map(function (product: Product, index){
                        const imagePath = `${serverApi}/${product?.productImages[0]}`
                        return (
                            <CssVarsProvider key={product?._id}>
                                <Card className={`card${index}`}>
                                    <CardCover>
                                        <img  src={imagePath} alt=""/>
                                    </CardCover>
                                    <CardCover className={"card-cover"} />
                                    <CardContent sx={{ justifyContent: 'flex-end' }}>
                                        <Stack 
                                            flexDirection={"row"}
                                            justifyContent={"space-between"}
                                        >
                                            <Typography level="h2" fontSize="lg" mb="1" textColor="#331f1fff">
                                                {product?.productName}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontWeight: "md",
                                                    color: "neutral.600",
                                                    alignItems: "center",
                                                    display: "flex"
                                                }}                                            
                                            >
                                                {product?.productViews}
                                                <VisiblityIcon sx={{fontSize: 25, marginLeft: "5px"}} />
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
                                            startDecorator={<DescriptionOutlined />}
                                            textColor={"neutral.600"}
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