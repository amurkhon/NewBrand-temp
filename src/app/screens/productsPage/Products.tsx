import { Container, Stack, Box, Pagination } from "@mui/material";
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { CssVarsProvider, Input } from "@mui/joy";
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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { setProducts } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { useHistory } from "react-router-dom";
import { ProductCollection } from "../../../lib/enums/product.enum";
import RentalCard from "./RentalCard";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { CartItem } from "../../../lib/types/search";


/** REDUX SELECTOR **/ 
const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts,
    (products) => ({products})
);

interface ProductsProps {
    onAdd: (item: CartItem) => void;
};

export default function Products(props: ProductsProps) {
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productsRetriever);

    const searchInquiry = {
            page:1,
            limit:12,
            order: "createdAt",
            search: '',
        };
    const [searchText, setSearchText] = useState<string>('');
    
    const [initialValue, setSearchValue] = useState<ProductInquiry>(searchInquiry);

    const [columnProduct, setRowProduct] = useState<boolean>(false);

    const history = useHistory();

    useEffect(() => {
        const product = new ProductService();

        product
            .getProducts(initialValue)
            .then((data) => {setProducts(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, [initialValue]);

    useEffect(() => {
        if(searchText === '') {
            initialValue.search = '';
            setSearchValue({ ...initialValue });
        }
    },[searchText]);

    /* Handlers */
    const searchCollectionHandler = (collection: ProductCollection) => {
        initialValue.page = 1;
        initialValue.productCollection = collection;
        setSearchValue({ ...initialValue });
    };

    const searchOrderHandler = (order: string) => {
        initialValue.page = 1;
        initialValue.order = order;
        setSearchValue({ ...initialValue });
    };

    const changeProductsRow = () => {
        setRowProduct(true);
    };

    const changeProductsColumn = () => {
        setRowProduct(false);
    };

    const searchPageHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        initialValue.page = value;
        setSearchValue({...initialValue});
    };
    const searchProductHandler = () => {
        initialValue.search = searchText;
        setSearchValue({ ...initialValue });
    };
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
                            <Typography>Showing 1-12 of {products?.length} results</Typography>
                        </Stack>
                        <Stack className={"product-filters"}>
                            <Input
                                size="md"
                                startDecorator={<SearchRoundedIcon />}
                                placeholder="Search"
                                aria-label="Search"
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') searchProductHandler();
                                }}
                            />
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
                                <Option value="CAP" onClick={() => searchCollectionHandler(ProductCollection.CAP)}>Cap</Option>
                                <Option value="T-SHIRT" onClick={() => searchCollectionHandler(ProductCollection.TSHIRT)}>T-Shirt</Option>
                                <Option value="SHIRT" onClick={() => searchCollectionHandler(ProductCollection.SHIRT)}>Shirt</Option>
                                <Option value="JACKET" onClick={() => searchCollectionHandler(ProductCollection.JACKET)}>Jacket</Option>
                                <Option value="SWEATER" onClick={() => searchCollectionHandler(ProductCollection.SWEATER)}>Sweater</Option>
                                <Option value="SHOES" onClick={() => searchCollectionHandler(ProductCollection.SHOES)}>Shoes</Option>
                                <Option value="SNEAKERS" onClick={() => searchCollectionHandler(ProductCollection.SNEAKERS)}>Sneakers</Option>
                                <Option value="JEANS" onClick={() => searchCollectionHandler(ProductCollection.JEANS)}>Jeans</Option>
                                <Option value="OTHER" onClick={() => searchCollectionHandler(ProductCollection.OTHER)}>Other</Option>
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
                                <Option value="productlikes" onClick={() => searchOrderHandler('productlikes')}>Sort by Rated</Option>
                                <Option value="productViews"  onClick={() => searchOrderHandler('productViews')}>Sort by Popularity</Option>
                                <Option value="productPrice"  onClick={() => searchOrderHandler('productPrice')}>Sort by Price</Option>
                                <Option value="createdAt"  onClick={() => searchOrderHandler('createdAt')}>Sort by Latest</Option>
                            </Select>
                            <ViewCompactIcon onClick={() => changeProductsColumn()} sx={{fontSize: "35px", border: "1px solid"}} />
                            <ViewHeadlineIcon onClick={() => changeProductsRow()} sx={{fontSize: "35px", border: "1px solid"}} />
                        </Stack>
                    </CssVarsProvider>
                </Stack>
                <Stack className={"products-box"}>
                    <CssVarsProvider>
                        {products?.length !== 0 ? ( products.map((product: Product, index) => {
                            const imagePath = `${serverApi}/${product?.productImages[0]}`
                            return (
                                columnProduct !== true ? 
                                <Card className={"card"}>
                                    <CardOverflow>
                                        <AspectRatio sx={{ width: 300 }}>
                                        <img
                                            style={{height: 300}}
                                            src={imagePath}
                                            alt=""
                                        />
                                        </AspectRatio>
                                    </CardOverflow>
                                    <CardContent>
                                        <Stack className="card-contents">
                                            <Link
                                                className={"card-title"}
                                                href={`/products/${product?._id}`}
                                                color="neutral"
                                                textColor="text.primary"
                                                overlay                                      
                                                sx={{ fontWeight: 'md' }}
                                            >
                                                {product?.productName}
                                            </Link>
                                            <Stack className={"card-icons"}>
                                                <FavoriteBorderIcon sx={{fontSize: "25px"}} />
                                                <RemoveRedEyeIcon sx={{fontSize: "25px"}} />{product?.productViews}
                                            </Stack>
                                        </Stack>
                                        <Typography
                                        level="title-lg"
                                        sx={{ mt: 1, fontWeight: 'xl' }}
                                        endDecorator={
                                            <Chip component="span" size="sm" variant="soft" color="success">
                                            Lowest price
                                            </Chip>
                                        }
                                        >
                                            {product?.productPrice}$
                                        </Typography>
                                        <Typography level="body-sm">
                                        (Only <b>{product?.productLeftCount}</b> left in stock!)
                                        </Typography>
                                    </CardContent>
                                    <CardOverflow>
                                        <Button 
                                            variant="outlined" 
                                            color="danger" 
                                            size="lg" 
                                            sx={{border: "0px"}}
                                            onClick={(e) => {
                                                onAdd({
                                                    _id: product._id,
                                                    quantity: 1,
                                                    name: product.productName,
                                                    price: product.productPrice,
                                                    image: product.productImages[0],
                                                })
                                                e.stopPropagation();
                                            }}
                                        >
                                            Add to cart
                                        </Button>
                                    </CardOverflow>
                                </Card> :
                                <RentalCard product={product} onAdd={onAdd} price={product?.productPrice} category={product?.productDesc} image={imagePath} title={product?.productName} />
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
                            page={initialValue?.page} 
                            color="secondary"
                            variant="outlined"
                            shape="rounded"
                            onChange={searchPageHandler}
                        />
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}