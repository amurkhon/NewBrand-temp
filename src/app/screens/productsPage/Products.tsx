import { Container, Stack, Box, Pagination } from "@mui/material";
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { CssVarsProvider } from "@mui/joy";
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import theme from "../../MaterialTheme";

export default function Products() {
    const products = [1,2,3,4,5,6,7,8,9,10,11,12];
    return (
        <div className={"productspage"}>
            <Stack className={"product-page-title"}>
                <CssVarsProvider>
                    <Container className={"page-title-container"}>
                        <Typography component={"h1"} fontSize={"30px"}>Shop Grid</Typography>
                        <Typography><Link href={'/'} className="landing-link">Home</Link> / Shop</Typography>
                    </Container>
                </CssVarsProvider>
            </Stack>
            <Container className={"products-container"}>
                <Stack className={"filter-box"}>
                    <CssVarsProvider>
                        <Stack className={"product-quantity"}>
                            <Typography>Showing 1-12 of 39 results</Typography>
                        </Stack>
                        <Stack className={"product-filters"}>
                            <Select
                                className={"collection-filter"}
                                placeholder="Select a collection"
                                indicator={<KeyboardArrowDown />}
                                sx={{
                                    width: 180,
                                    [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: 'rotate(-180deg)',
                                    },
                                    },
                                }}
                                >
                                <Option value="CAP">Cap</Option>
                                <Option value="T-SHIRT">T-Shirt</Option>
                                <Option value="SHIRT">Shirt</Option>
                                <Option value="JACKET">Jacket</Option>
                                <Option value="SWEATER">Sweater</Option>
                                <Option value="SHOES">Shoes</Option>
                                <Option value="SNEAKERS">Sneakers</Option>
                                <Option value="JEANS">Jeans</Option>
                                <Option value="OTHER">Other</Option>
                            </Select>
                            <Select
                                placeholder="Sort by Default"
                                className={"sort"}
                                indicator={<KeyboardArrowDown />}
                                sx={{
                                    width: 157,
                                    [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: 'rotate(-180deg)',
                                    },
                                    },
                                }}
                                >
                                <Option value="productlikes">Sort by Rated</Option>
                                <Option value="productViews">Sort by Popularity</Option>
                                <Option value="productPrice">Sort by Price</Option>
                                <Option value="createdAt">Sort by Latest</Option>
                            </Select>
                            <ViewCompactIcon sx={{fontSize: "35px", border: "1px solid"}} />
                            <ViewHeadlineIcon sx={{fontSize: "35px", border: "1px solid"}} />
                        </Stack>
                    </CssVarsProvider>
                </Stack>
                <Stack className={"products-box"}>
                    <CssVarsProvider>
                        {products?.length !== 0 ? ( products.map((product: number, index) => {
                            return (
                                <Card className={"card"}>
                                    <CardOverflow>
                                        <AspectRatio sx={{ minWidth: 200 }}>
                                        <img
                                            src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
                                            srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
                                            loading="lazy"
                                            alt=""
                                        />
                                        </AspectRatio>
                                    </CardOverflow>
                                    <CardContent>
                                        <Stack className="card-contents">
                                            <Typography className={"card-title"}>Bluetooth Headset</Typography>
                                            <Stack className={"card-icons"}>
                                                <FavoriteBorderIcon sx={{fontSize: "25px"}} />
                                                <RemoveRedEyeIcon sx={{fontSize: "25px"}} /> 10
                                            </Stack>
                                        </Stack>
                                        <Link
                                        href="#product-card"
                                        color="neutral"
                                        textColor="text.primary"
                                        overlay
                                        endDecorator={<ArrowOutwardIcon />}
                                        sx={{ fontWeight: 'md' }}
                                        >
                                        Super Rockez A400
                                        </Link>

                                        <Typography
                                        level="title-lg"
                                        sx={{ mt: 1, fontWeight: 'xl' }}
                                        endDecorator={
                                            <Chip component="span" size="sm" variant="soft" color="success">
                                            Lowest price
                                            </Chip>
                                        }
                                        >
                                        2,900 THB
                                        </Typography>
                                        <Typography level="body-sm">
                                        (Only <b>7</b> left in stock!)
                                        </Typography>
                                    </CardContent>
                                    <CardOverflow>
                                        <Button variant="outlined" color="danger" size="lg" sx={{border: "0px"}}>
                                        Add to cart
                                        </Button>
                                    </CardOverflow>
                                </Card>
                            );
                        })) : <Box className="no-data">New Product Are Not Available!</Box>}
                    </CssVarsProvider>
                </Stack>
                <Stack className={"pagination-box"}>
                    <CssVarsProvider>
                        <Stack className={"product-quantity"}>
                            <Select
                                className={"collection-filter"}
                                defaultValue={"12"}
                                indicator={<KeyboardArrowDown />}
                                sx={{
                                    width: 180,
                                    [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: 'rotate(-180deg)',
                                    },
                                    },
                                }}
                                >
                                <Option value="12" >Show 12 per page</Option>
                                <Option value="24">Show 24 per page</Option>
                                <Option value="15">Show 15 per page</Option>
                                <Option value="30">Show 30 per page</Option>
                            </Select>
                        </Stack>
                    </CssVarsProvider>
                    <Stack className={"paginaton"}>
                        <Pagination 
                            count={10} 
                            page={1} 
                            color="secondary"
                            variant="outlined"
                            shape="rounded"
                        />
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}