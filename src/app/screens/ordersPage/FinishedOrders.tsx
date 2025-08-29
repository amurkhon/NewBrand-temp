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

interface PausedOrders{
    setValue: (input: string) => void;
};

export default function FinishedOrders(props: PausedOrders) {
    const {setValue} = props;
    /* HANDLERS */
    return (
        <TabPanel value={"3"}>
            <CssVarsProvider>
            <Box className={"orderitem-box"}>
                <List
                    aria-labelledby="ellipsis-list-demo"
                    sx={{ '--ListItemDecorator-size': '56px',marginBottom: "10px",padding: "5px",backgroundColor: "#feffffff", }}
                >
                    <ListItem>
                        <ListItemDecorator>
                            <Avatar src="/static/images/avatar/1.jpg" />
                        </ListItemDecorator>
                        <ListItemContent>
                            <Typography level="title-sm">Name</Typography>
                            <Stack className={"orderitem-info"}>
                                <Typography level="title-sm">Price: 8$</Typography>
                                <Typography marginLeft={2} level="title-sm">Count: 2</Typography>
                            </Stack>
                        </ListItemContent>
                    </ListItem>
                    <ListItem>
                        <ListItemDecorator>
                            <Avatar src="/static/images/avatar/1.jpg" />
                        </ListItemDecorator>
                        <ListItemContent>
                            <Typography level="title-sm">Name</Typography>
                            <Stack className={"orderitem-info"}>
                                <Typography level="title-sm">Price: 8$</Typography>
                                <Typography marginLeft={2} level="title-sm">Count: 2</Typography>
                            </Stack>
                        </ListItemContent>
                    </ListItem>
                    <Stack className={"orderitem-footer"}>
                        <Stack className={"total-price"}>
                            <Typography marginLeft={2} level="title-sm">Delivery cost: 5$</Typography>
                            <Typography marginLeft={2} level="title-sm"> Total: 21$</Typography>
                        </Stack>
                    </Stack>
                </List>
                <List
                    aria-labelledby="ellipsis-list-demo"
                    sx={{ '--ListItemDecorator-size': '56px',marginBottom: "10px",boxShadow: "lg",padding: "5px",backgroundColor: "#feffffff", }}
                >
                    <ListItem>
                        <ListItemDecorator>
                            <Avatar src="/static/images/avatar/1.jpg" />
                        </ListItemDecorator>
                        <ListItemContent>
                            <Typography level="title-sm">Name</Typography>
                            <Stack className={"orderitem-info"}>
                                <Typography level="title-sm">Price: 8$</Typography>
                                <Typography marginLeft={2} level="title-sm">Count: 2</Typography>
                            </Stack>
                        </ListItemContent>
                    </ListItem>
                    <Stack className={"orderitem-footer"}>
                        <Stack className={"total-price"}>
                            <Typography marginLeft={2} level="title-sm">Delivery cost: 5$</Typography>
                            <Typography marginLeft={2} level="title-sm"> Total: 21$</Typography>
                        </Stack>
                    </Stack>
                </List>
            </Box>
            </CssVarsProvider>
        </TabPanel>
    );
}