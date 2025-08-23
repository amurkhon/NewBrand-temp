import { Box, Container, Stack } from "@mui/material";
import { CardContent, CardCover, CssVarsProvider } from "@mui/joy";

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from "../../components/divider"
import Typography from '@mui/joy/Typography';
import VisiblityIcon from "@mui/icons-material/Visibility"
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';



/** REDUX SELECTOR **/ 
const newclothes = [1,2,3,4]

export default function NewDishes() {
    const newClothes = [1,2,3,4]

    return (
        <div className="new-dishes-frame">
            <Container>
                <Stack className="new-dishes">
                    <Box className="category-title">New Fashions</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            { newClothes.length !== 0 ? (
                            newClothes.map((num: number, index) => {
                                return (
                                    <Card className={"card"} sx={{ minHeight: '280px', width: 320 }}>
                                        <CardCover>
                                            <img
                                            src="/img/dressWhite.jpg"
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
                                            Yosemite National Park
                                            </Typography>
                                            <Typography
                                            startDecorator={<LocationOnRoundedIcon />}
                                            textColor="neutral.300"
                                            >
                                            California, USA
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