import { TabPanel } from "@mui/lab";
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import { Button, CssVarsProvider, Stack } from "@mui/joy";
import "../../../css/orders.css"
import { createSelector } from "@reduxjs/toolkit";
import { retrieveFinishedOrdersPage } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const finishedOrdersRetriver = createSelector(
    retrieveFinishedOrdersPage,
    (finishedOrders) => ({finishedOrders})
);

export default function FinishedOrders() {
    const { finishedOrders } = useSelector(finishedOrdersRetriver);
    /* HANDLERS */
    return (
        <TabPanel value={"3"}>
            <CssVarsProvider>
            <Box className={"orderitem-box"}>
                {finishedOrders?.map((order: Order) => {
                    return (
                        <List
                            aria-labelledby="ellipsis-list-demo"
                            sx={{ '--ListItemDecorator-size': '56px',marginBottom: "10px",padding: "5px",backgroundColor: "#feffffff", }}
                        >
                            {order?.orderItems?.map((orderItem: OrderItem) => {
                                const product: Product = order?.productData?.filter(
                                    (ele: Product) => orderItem?.productId === ele?._id
                                )[0];
                                const imagePath = `${serverApi}/${product?.productImages[0]}`;
                                return (
                                    <ListItem>
                                        <ListItemDecorator>
                                            <Avatar src={imagePath} />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            <Typography level="title-sm">{product?.productName}</Typography>
                                            <Stack className={"orderitem-info"}>
                                                <Typography level="title-sm">Price: {product?.productPrice}$</Typography>
                                                <Typography marginLeft={2} level="title-sm">Count: {orderItem?.itemQuantity}</Typography>
                                            </Stack>
                                        </ListItemContent>
                                    </ListItem>
                                );
                            })}
                            <Stack className={"orderitem-footer"}>
                                <Stack className={"total-price"}>
                                    <Typography marginLeft={2} level="title-sm">Delivery cost: {order?.orderDelivery}$</Typography>
                                    <Typography marginLeft={2} level="title-sm"> Total: {order?.orderTotal}$</Typography>
                                </Stack>
                            </Stack>
                        </List>
                    );
                })}
            </Box>
            </CssVarsProvider>
        </TabPanel>
    );
}