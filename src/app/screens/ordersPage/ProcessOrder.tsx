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
import { useGlobals } from "../../hooks/useGlobals";
import { retrieveProcessOrdersPage } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { Messages, serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderSrevice from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";

const processOrdersRetriver = createSelector(
    retrieveProcessOrdersPage,
    (processOrders) => ({processOrders})
);

interface PausedOrders{
    setValue: (input: string) => void;
};

export default function ProcessOrders(props: PausedOrders) {
    const { authMember, setOrderBuilder } = useGlobals();
    const { processOrders} = useSelector(processOrdersRetriver);
    const {setValue} = props;
    /* HANDLERS */

    const finishOrderHandler = async (e: T) => {
        try {
            if(!authMember) throw new Error(Messages.error2);
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId,
                orderStatus: OrderStatus.FINISH,
            };

            const confirmation = window.confirm("Have you recieved your order?");
            if(confirmation) {
                const order = new OrderSrevice();
                await order.updateOrder(input);
                setValue("3");
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err);
        }
    }
    return (
        <TabPanel value={"2"}>
            <CssVarsProvider>
            <Box className={"orderitem-box"}>
                {processOrders?.map((order: Order) => {
                    return (
                        <List
                            aria-labelledby="ellipsis-list-demo"
                            sx={{ '--ListItemDecorator-size': '56px',marginBottom: "10px",boxShadow: "lg",padding: "5px",backgroundColor: "#feffffff", }}
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
                                <Stack className={"buttons"}>
                                    <Button value={order?._id} sx={{width: "200px"}} variant={"outlined"} color={"success"} onClick={finishOrderHandler}>Verify to Fulfill</Button>
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