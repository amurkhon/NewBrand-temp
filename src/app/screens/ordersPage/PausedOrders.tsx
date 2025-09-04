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
import { retrievePausedOrdersPage } from "./selector";
import { useGlobals } from "../../hooks/useGlobals";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Messages, serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderSrevice from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const pausedOrdersRetriver = createSelector(
    retrievePausedOrdersPage,
    (pausedOrders) => ({pausedOrders})
);

interface PausedOrders{
    setValue: (input: string) => void;
};

export default function PausedOrders(props: PausedOrders) {
    const { authMember, setOrderBuilder } = useGlobals();
    const { pausedOrders } = useSelector(pausedOrdersRetriver);
    const {setValue} = props;

    /* HANDLERS */

    const deleteOrderHandler = async (e: T) => {
        try {
            if(!authMember) throw new Error(Messages.error2);
            console.log("target: ", e.target);
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId,
                orderStatus: OrderStatus.DELETE,
            };

            const confirmation = window.confirm("Do you want to delete Order?");
            if(confirmation) {
                const order = new OrderSrevice();
                await order.updateOrder(input);
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err);
        }
    };

    const processOrderHandler = async (e: T) => {
        try {
            if(!authMember) throw new Error(Messages.error2);
            // Payment Process
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId,
                orderStatus: OrderStatus.PROCESS,
            };

            const confirmation = window.confirm("Do you want to proceed with Payment?");
            if(confirmation) {
                const order = new OrderSrevice();
                await order.updateOrder(input);
                setValue("2");
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err);
        }
    }
    return (
        <TabPanel value={"1"}>
            <CssVarsProvider>
            <Box className={"orderitem-box"} >
                {pausedOrders?.map((order: Order) => {
                    return (
                        <List
                            key={order?._id}
                            aria-labelledby="ellipsis-list-demo"
                            sx={{ '--ListItemDecorator-size': '56px',marginBottom: "10px",boxShadow: "lg",padding: "5px",backgroundColor: "#feffffff", }}
                        >
                            {order?.orderItems?.map((orderItem: OrderItem) => {
                                const product: Product = order.productData.filter(
                                    (ele: Product) => orderItem.productId === ele._id
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
                                <Stack className={"buttons"}>
                                    <Button value={order?._id} sx={{width: "100px"}} variant={"outlined"} color={"danger"} onClick={deleteOrderHandler}>Cancel</Button>
                                    <Button value={order?._id} sx={{width: "100px"}} variant={"outlined"} color={"success"} onClick={processOrderHandler}>Payment</Button>
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