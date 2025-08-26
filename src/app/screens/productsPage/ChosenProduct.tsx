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
import { CssVarsProvider } from "@mui/joy";

export default function ChosenProduct() {
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
                            <SwiperSlide>
                                <img className="slider-image" src={"/img/event1.jpg"} />
                            </SwiperSlide>
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
                                        Product Name
                                    </Typography>
                                    <Typography
                                        level="body-sm"
                                        textColor="text.tertiary"
                                        sx={{ fontWeight: 'lg' }}
                                    >
                                        New Brand
                                    </Typography>
                                    <Sheet
                                        sx={{
                                        bgcolor: 'background.level1',
                                        borderRadius: 'sm',
                                        p: 1.5,
                                        my: 9,
                                        display: 'flex',
                                        gap: 2,
                                        '& > div': { flex: 1 },
                                        }}
                                    >
                                        <div>
                                            <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                                Views
                                            </Typography>
                                            <Typography sx={{ fontWeight: 'lg' }}>34</Typography>
                                        </div>
                                        <div>
                                            <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                                Likes
                                            </Typography>
                                            <Typography sx={{ fontWeight: 'lg' }}>980</Typography>
                                        </div>
                                        <div>
                                            <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                                Rating
                                            </Typography>
                                            <Typography sx={{ fontWeight: 'lg' }}>8.9</Typography>
                                        </div>
                                    </Sheet>
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