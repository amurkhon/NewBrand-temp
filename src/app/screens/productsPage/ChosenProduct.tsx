import { Box, Container, Stack } from "@mui/material";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, Divider } from "@mui/joy";
import { Product } from "../../../lib/types/product";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setMall } from "./slice";
import { Member } from "../../../lib/types/member";
import { retrieveChosenProduct, retrieveMall } from "./selector";
import { CartItem } from "../../../lib/types/search";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../lib/config";

/** REDUX SELECTOR **/ 
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
    setMall: (data: Member) => dispatch(setMall(data)),
});
interface id {
    productId: string
};

const chosenProductRetriever = createSelector(retrieveChosenProduct,
    (product) => ({product})
);

const mallRetriever = createSelector(retrieveMall,
    (mall) => ({mall})
);

interface ChosenProductProps {
    onAdd: (item: CartItem) => void;
};

export default function ChosenProduct() {
    const { productId } = useParams<id>();
    const { setChosenProduct, setMall } = actionDispatch(useDispatch());
    const { product } = useSelector(chosenProductRetriever);
    const { mall } = useSelector(mallRetriever);

    useEffect(() => {
        const product = new ProductService();
        const member = new MemberService();

        product
            .getProduct(productId)
            .then((data) => setChosenProduct(data))
            .catch((err) => console.log(err));
        
        member
            .getMall()
            .then((data) => setMall(data))
            .catch((err) => console.log(err));
    },[]);

    if(!product) return null;
    return (
        <div className={"chosen-product"}>
            <Box className={"title"}>Product Detail</Box>
            <Container className={"product-container"}>
                <Stack className={"chosen-product-slider"}>
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="swiper-area"
                    >
                        {product?.productImages.map(
                            (ele: String, index: number) => {
                            const imagePath = `${serverApi}/${ele}`
                            return (
                                <SwiperSlide key={index}>
                                    <img className="slider-image" src={imagePath} />
                                </SwiperSlide>
                            );
                            }
                        )}
                    </Swiper>
                </Stack>
                <Stack className={"product-info"}>
                    <CssVarsProvider>
                        <Card
                                orientation="horizontal"
                                sx={{
                                    height: "100%",
                                    width: '100%',
                                    flexWrap: 'wrap',
                                    [`& > *`]: {
                                    '--stack-point': '500px',
                                    minWidth:
                                    'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
                                    },
                                    // make the card resizable for demo
                                    overflow: 'auto',
                                    resize: 'horizontal',
                                }}
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 'xl', fontWeight: 'lg' }}>
                                        {product?.productName}
                                    </Typography>
                                    <Typography
                                        level="body-lg"
                                        textColor="text.icon"
                                        sx={{ fontWeight: 'md', marginTop:"15px" }}
                                    >
                                        {mall?.memberNick}
                                    </Typography>
                                    <Typography
                                        level="body-lg"
                                        textColor="text.icon"
                                        sx={{ fontWeight: 'md'}}
                                    >
                                        Phone: {mall?.memberPhone}
                                    </Typography>
                                    <Sheet
                                        sx={{
                                        bgcolor: 'background.level1',
                                        borderRadius: 'sm',
                                        p: 1.5,
                                        my: 3,
                                        display: 'flex',
                                        gap: 2,
                                        '& > div': { flex: 1 },
                                        }}
                                    >
                                        <div>
                                            <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                                Views
                                            </Typography>
                                            <Typography sx={{ fontWeight: 'lg' }}>{product?.productViews}</Typography>
                                        </div>
                                        <div>
                                            <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                                Likes
                                            </Typography>
                                            <Typography sx={{ fontWeight: 'lg' }}>25</Typography>
                                        </div>
                                        <div>
                                            <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                                Rating
                                            </Typography>
                                            <Typography sx={{ fontWeight: 'lg' }}>8.9</Typography>
                                        </div>
                                    </Sheet>
                                    <Typography>
                                        {product?.productDesc}
                                    </Typography>
                                    <Divider sx={{width: "100%", height: "2px", marginTop: "20px"}} />
                                    <div className={"product-price"}>
                                        <span>Price:</span>
                                        <span>{product?.productPrice ? product?.productPrice : 'No description!'} $</span>
                                    </div>
                                    <Box sx={{ height: "100%",display: 'flex',flexDirection: "row",alignItems: "flex-end", gap: 1.5, '& > button': { flex: 1 } }}>
                                        <Button variant="outlined" color="neutral">
                                            Add to Card
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                    </CssVarsProvider>
                </Stack>
            </Container>
        </div>
        );
}

function setProduct(data: Product): any {
    throw new Error("Function not implemented.");
}
