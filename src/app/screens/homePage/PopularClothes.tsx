import { Box, Container, Stack } from "@mui/material";

import {CssVarsProvider} from "@mui/joy/styles"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import VisiblityIcon from "@mui/icons-material/Visibility"
import CardOverflow from '@mui/joy/CardOverflow';
import { DescriptionOutlined } from "@mui/icons-material";

/** REDUX SELECTOR **/ 

export default function PopularClothes() {
    const popularDishes = [1,2,3,4];
    let classname ='';
    return <div className="popular-dishes-frame">
        <Container>
            <Stack className="popular-section">
                <Box className="category-title">Popular Clothes</Box>
                <Stack className="cards-frame">
                    { popularDishes.length !== 0 ? (
                    popularDishes.map(function (num: number, index){
                        num === index + 1  ? classname = `card${num}`: classname = 'card';
                        return (
                            <CssVarsProvider key={num}>
                                <Card className={classname}>
                                    <CardCover>
                                        <img  src={"img/rose.webp"} alt=""/>
                                    </CardCover>
                                    <CardCover className={"card-cover"} />
                                    <CardContent sx={{ justifyContent: 'flex-end' }}>
                                        <Stack 
                                            flexDirection={"row"}
                                            justifyContent={"space-between"}
                                        >
                                            <Typography level="h2" fontSize="lg" mb="1" textColor="#fff">
                                                New Clothe
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontWeight: "md",
                                                    color: "neutral.300",
                                                    alignItems: "center",
                                                    display: "flex"
                                                }}                                            
                                            >
                                                2
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
                                            textColor={"neutral.300"}
                                        >
                                            Beautiful
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