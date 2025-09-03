import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { Logout } from "@mui/icons-material";
import { CartItem } from "../../../lib/types/search";

interface OtherNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
};

export default function OtherNavbar(props: OtherNavbarProps) {

    const {
        cartItems, 
        onAdd, 
        onRemove, 
        onDelete, 
        onDeleteAll
    } = props;
    const authMember = 1;

    return <div className="other-navbar">
    <Container className="navbar-container">
        <Stack className="menu">
            <Box>
                <NavLink to="/">
                    <img className="brand-logo" src="/icons/brand.svg.svg" />
                </NavLink>
            </Box>
            <Stack className="links">
                <Box className={"hover-line"}>
                    <NavLink to="/">Home</NavLink>
                </Box>
                <Box className={"hover-line"}>
                    <NavLink activeClassName={"underline"} to="/products">Products</NavLink>
                </Box>
                {authMember ? (
                    <Box className={"hover-line"}>
                        <NavLink activeClassName={"underline"} to="/orders">Orders</NavLink>
                    </Box>
                ): null}
                {authMember ? (
                    <Box className={"hover-line"}>
                        <NavLink activeClassName={"underline"} to="/member-page">My Page</NavLink>
                    </Box>
                ): null}
                <Box className={"hover-line"}>
                    <NavLink activeClassName={"underline"} to="/help">Help</NavLink>
                </Box>

                <Basket
                    cartItems={cartItems}
                    onAdd = {onAdd}
                    onRemove={onRemove} 
                    onDelete = {onDelete} 
                    onDeleteAll = {onDeleteAll}
                />

                {!authMember ? (
                    <Box>
                        <Button variant="contained" className="login-button">LOGIN</Button>
                    </Box>
                ) : (
                    <img 
                        className="user-avatar"
                        src={"/icons/default-user.svg"}
                        aria-haspopup={"true"}
                    />
                )}
                <Menu
                    id="account-menu"
                    open={false}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" style={{ color: 'blue' }} />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Stack>
        </Stack>
    </Container>
</div>;
}