import { Box, Button, Container, ListItemIcon, Menu, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { Logout } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useHistory } from "react-router-dom";


interface HomeNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void;
    setLoginOpen: (isOpen: boolean) => void;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void
};

const looks = [
  {
    title: "Neon Street",
    subtitle: "Bold urban style",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop",
    color: "#ec4899",
  },
  {
    title: "Summer Pop",
    subtitle: "Fresh bright vibes",
    image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1400&auto=format&fit=crop",
    color: "#22c55e",
  },
  {
    title: "Luxury Glow",
    subtitle: "Premium fashion look",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
    color: "#a855f7",
  },
]


export default function HomeNavbar(props: HomeNavbarProps) {
    const {
        cartItems, 
        onAdd, 
        onRemove, 
        onDelete, 
        onDeleteAll,
        setSignupOpen, 
        setLoginOpen,
        handleLogoutClick,
        anchorEl,
        handleCloseLogout,
        handleLogoutRequest
    } = props;
    const history = useHistory();
    const { authMember } = useGlobals();
    const [index, setIndex] = useState(0);
    const look = looks[index];
    const next = () => setIndex((index + 1) % looks.length);
    const prev = () => setIndex((index - 1 + looks.length) % looks.length);
    return <div className="home-navbar">
        <Stack className={"navbar-container"}>
            <Stack className="navbar-block">
                <Container className={"menu"}>
                    <Box>
                        <NavLink to="/">
                            <img className={"brand-logo"} src="/icons/brand.svg.svg" />
                        </NavLink>
                    </Box>
                    <Stack className={"links"}>
                        <Box className={"hover-line"}>
                            <NavLink activeClassName={"underline"} to="/">Home</NavLink>
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
                                <Button variant="contained" onClick={() => setLoginOpen(true)} className={"login-button"}>LOGIN</Button>
                            </Box>
                        ) : (
                            <img 
                                className={"user-avatar"}
                                src={
                                    authMember?.memberImage 
                                        ? `${serverApi}/${authMember.memberImage}`
                                        : "/icons/default-user.svg"
                                }
                                aria-haspopup = {"true"}
                                onClick={handleLogoutClick}  
                            />
                        )}

                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={Boolean(anchorEl)}
                            onClick={handleCloseLogout}
                            onClose={handleCloseLogout}
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
                            <MenuItem onClick={handleLogoutRequest}>
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{ color: 'blue' }} />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Container>
            </Stack>
            <Box
                sx={{
                    minHeight: "100vh",
                    background: `linear-gradient(120deg, ${look.color} 0%, #ffffff 40%, ${look.color} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    transition: "all 0.6s ease",
                }}
                >
                <Container maxWidth="xl">
                    <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={6}
                    alignItems="flex-end"
                    >
                    {/* LEFT TEXT */}
                    <Box flex={1}>
                        <Typography
                        sx={{
                            fontSize: { xs: "3.2rem", md: "5rem" },
                            fontWeight: 900,
                            lineHeight: 1,
                            color: "#020617",
                        }}
                        >
                        {look.title}
                        </Typography>

                        <Typography
                        mt={2}
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: 600,
                            color: "#020617",
                        }}
                        >
                        {look.subtitle}
                        </Typography>

                        <Typography mt={3} maxWidth={450} color="#020617">
                        Discover limited fashion drops designed for bold personalities.
                        Bright colors, premium fabrics, and street-ready designs.
                        </Typography>

                        <Stack direction="row" spacing={3} mt={6}>
                        {!authMember ? (
                            <Button
                                variant="contained"
                                onClick={() => setSignupOpen(true)}
                                sx={{
                                px: 5,
                                py: 1.8,
                                borderRadius: "30px",
                                bgcolor: "#020617",
                                color: "white",
                                fontWeight: 700,
                                fontSize: "1rem",
                                }}
                            >
                                Sign Up
                            </Button>
                        ):(
                            <Button
                                variant="contained"
                                onClick={() => history.push("/products")}
                                sx={{
                                px: 5,
                                py: 1.8,
                                borderRadius: "30px",
                                bgcolor: "#020617",
                                color: "white",
                                fontWeight: 700,
                                fontSize: "1rem",
                                }}
                            >
                                Shop Now
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            sx={{
                            px: 5,
                            py: 1.8,
                            borderRadius: "30px",
                            borderColor: "#020617",
                            color: "#020617",
                            fontWeight: 700,
                            }}
                        >
                            Next Look
                        </Button>
                        </Stack>
                    </Box>

                    {/* RIGHT IMAGE */}
                    <Box
                        flex={1}
                        position="relative"
                        height={550}
                        sx={{
                        borderRadius: 8,
                        overflow: "hidden",
                        boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
                        transition: "all 0.6s ease",
                        top: "130px"
                        }}
                    >
                        <Box
                        component="img"
                        src={look.image}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.6s ease",
                            "&:hover": { transform: "scale(1.06)" },
                        }}
                        />

                        {/* Floating Controls */}
                        <Box
                        sx={{
                            position: "absolute",
                            bottom: 20,
                            right: 20,
                            display: "flex",
                            gap: 2,
                        }}
                        >
                        <IconButton
                            onClick={prev}
                            sx={{
                            bgcolor: "white",
                            color: "#020617",
                            "&:hover": { bgcolor: look.color },
                            }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <IconButton
                            onClick={next}
                            sx={{
                            bgcolor: "white",
                            color: "#020617",
                            "&:hover": { bgcolor: look.color },
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                        </Box>
                    </Box>
                    </Stack>
                </Container>
                </Box>
        </Stack>
    </div>;
}